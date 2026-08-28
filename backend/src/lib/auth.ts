import { Role } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { ApiError } from "./http";
import { prisma } from "./prisma";

/**
 * Xác thực bằng JWT ký HMAC-SHA256.
 *
 * Trước đây `/api/auth/login` chỉ kiểm mật khẩu rồi trả hồ sơ, còn mọi route
 * ghi thì ai gọi cũng được — chỉ cần biết địa chỉ là sửa được dữ liệu. Giờ
 * client phải gửi kèm `Authorization: Bearer <token>` và server tự kiểm.
 *
 * Token đi theo HAI đường, ưu tiên theo thứ tự:
 *  1. Cookie `HttpOnly` — JavaScript trên trang KHÔNG đọc được, nên site dính
 *     XSS thì token vẫn an toàn. Đây là đường mặc định.
 *  2. Header `Authorization: Bearer` — chỉ dùng khi cookie không tới được, tức
 *     là frontend và API nằm trên hai site khác nhau (ví dụ hai dự án
 *     `*.vercel.app` riêng biệt, vì `.vercel.app` nằm trong Public Suffix List
 *     nên trình duyệt coi là cross-site).
 *
 * Muốn dùng hẳn cookie và bỏ localStorage: đặt API ở subdomain cùng tên miền
 * với web (`miewwl.vn` + `api.miewwl.vn`). Frontend tự phát hiện điều này và
 * sẽ không lưu token vào localStorage nữa.
 */

const ALG = "HS256";

/** Token sống 7 ngày — đủ để nhân viên không phải đăng nhập lại mỗi ca. */
const TOKEN_TTL = "7d";

function secret(): Uint8Array {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) {
    // Thà chết ngay lúc khởi động còn hơn chạy với chuỗi ký đoán được.
    throw new Error(
      "Thiếu AUTH_SECRET (cần ít nhất 32 ký tự). Xem backend/.env.example."
    );
  }
  return new TextEncoder().encode(value);
}

export interface SessionUser {
  id: string;
  email: string;
  role: Role;
}

/**
 * Phát token cho một phiên.
 *
 * `issuedAt` chỉ dùng khi vừa thu hồi phiên xong mà vẫn muốn giữ thiết bị hiện
 * tại đăng nhập: `iat` của JWT chỉ có độ phân giải TỚI GIÂY, nên token phát ra
 * ngay sau khi thu hồi sẽ bị chính mốc thu hồi loại bỏ nếu không làm tròn lên.
 */
export async function createToken(user: SessionUser, issuedAt?: Date): Promise<string> {
  const iat = issuedAt ? Math.ceil(issuedAt.getTime() / 1000) : undefined;
  const jwt = new SignJWT({ email: user.email, role: user.role })
    .setProtectedHeader({ alg: ALG })
    .setSubject(user.id)
    .setExpirationTime(TOKEN_TTL);
  return (iat === undefined ? jwt.setIssuedAt() : jwt.setIssuedAt(iat)).sign(secret());
}

/** Tên cookie giữ phiên đăng nhập. */
export const SESSION_COOKIE = "miewwl_session";

/** Cookie trước, header sau. */
function extractToken(req: Request): string | null {
  const cookie = req.headers.get("cookie");
  if (cookie) {
    for (const part of cookie.split(";")) {
      const [name, ...rest] = part.trim().split("=");
      if (name === SESSION_COOKIE && rest.length) {
        return decodeURIComponent(rest.join("="));
      }
    }
  }
  const header = req.headers.get("authorization");
  if (header?.startsWith("Bearer ")) return header.slice(7).trim();
  return null;
}

/**
 * Đọc phiên từ cookie hoặc header; `null` nếu không có hoặc không hợp lệ.
 *
 * Ngoài việc kiểm chữ ký, còn đối chiếu với `sessionsValidFrom` của tài khoản:
 * token phát ra TRƯỚC lần đăng xuất/đổi mật khẩu gần nhất sẽ bị từ chối. Nếu
 * không, token bị lộ vẫn dùng được đến hết 7 ngày dù người dùng đã đăng xuất.
 *
 * Cái giá là một truy vấn database cho mỗi request cần quyền — chấp nhận được,
 * vì các trang công khai (sản phẩm, giống, bài viết) không đi qua đây.
 */
export async function readSession(req: Request): Promise<SessionUser | null> {
  const token = extractToken(req);
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret(), {
      algorithms: [ALG],
    });
    if (!payload.sub || typeof payload.role !== "string") return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { role: true, email: true, sessionsValidFrom: true },
    });
    // Tài khoản đã bị xoá thì token cũng vô nghĩa.
    if (!user) return null;

    const issuedAt = typeof payload.iat === "number" ? payload.iat * 1000 : 0;
    if (user.sessionsValidFrom && issuedAt < user.sessionsValidFrom.getTime()) {
      return null;
    }

    // Vai trò lấy từ database, không lấy từ token: hạ quyền ai đó phải có hiệu
    // lực ngay, không đợi token của họ hết hạn.
    return {
      id: payload.sub,
      email: user.email,
      role: user.role,
    };
  } catch {
    // Hết hạn, sai chữ ký, hoặc rác — đều coi như chưa đăng nhập.
    return null;
  }
}

/** Bắt buộc đã đăng nhập. Ném 401 nếu không. */
export async function requireAuth(req: Request): Promise<SessionUser> {
  const session = await readSession(req);
  if (!session) throw new ApiError("Bạn cần đăng nhập để thực hiện thao tác này.", 401);
  return session;
}

/**
 * Bắt buộc đã đăng nhập VÀ thuộc một trong các vai trò cho phép.
 * Ném 401 khi chưa đăng nhập, 403 khi sai vai trò — hai lỗi khác nhau nên
 * client hiển thị được thông báo khác nhau.
 */
export async function requireRole(req: Request, ...roles: Role[]): Promise<SessionUser> {
  const session = await requireAuth(req);
  if (!roles.includes(session.role)) {
    throw new ApiError("Tài khoản của bạn không có quyền thực hiện thao tác này.", 403);
  }
  return session;
}

/** Nhân viên cửa hàng: xử lý đơn và lịch spa. */
export const STAFF_ROLES: Role[] = ["STAFF", "ADMIN"];

/** 7 ngày, khớp với hạn của token. */
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;

/**
 * Chuỗi `Set-Cookie` cho phiên đăng nhập.
 *
 * `SameSite=Lax` để cookie đi được giữa web và API khi hai bên cùng site
 * (`localhost:3000` ↔ `localhost:3001`, hay `miewwl.vn` ↔ `api.miewwl.vn`).
 * Khác site thì trình duyệt bỏ cookie này và frontend tự chuyển sang Bearer.
 */
export function sessionCookie(token: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

/** Chuỗi `Set-Cookie` để xoá phiên khi đăng xuất. */
export function clearSessionCookie(): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${SESSION_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

/**
 * Vô hiệu hoá mọi token đã phát cho một tài khoản.
 * Gọi khi đăng xuất, đổi mật khẩu, hoặc quản trị đặt lại mật khẩu.
 *
 * Cộng thêm 1 giây để token phát trong cùng giây đó cũng bị tính là cũ — `iat`
 * chỉ có độ phân giải tới giây nên không cộng thì token cũ vẫn lọt.
 *
 * Trả về đúng mốc đã dùng, để chỗ gọi phát token mới với `iat` ≥ mốc này mà
 * không tự đá mình ra ngoài.
 */
export async function revokeSessions(userId: string): Promise<Date> {
  const validFrom = new Date(Date.now() + 1000);
  await prisma.user.update({
    where: { id: userId },
    data: { sessionsValidFrom: validFrom },
  });
  return validFrom;
}
