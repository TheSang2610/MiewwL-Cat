import { handle, ok } from "@/lib/http";
import { clearSessionCookie, readSession, revokeSessions } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Đăng xuất: xoá cookie VÀ vô hiệu hoá mọi token đã phát cho tài khoản đó.
 *
 * Cookie là `HttpOnly` nên JavaScript trên trang không tự xoá được — phải nhờ
 * server. Riêng việc xoá cookie thì chưa đủ: token có thể đã bị sao chép nơi
 * khác, nên phải đẩy mốc `sessionsValidFrom` để mọi token cũ hết hiệu lực ngay.
 *
 * Không yêu cầu phải đang đăng nhập: gọi đăng xuất khi phiên đã hỏng vẫn phải
 * trả về thành công, để giao diện luôn dọn được trạng thái của mình.
 */
export const POST = handle(async (req: Request) => {
  const session = await readSession(req);
  if (session) await revokeSessions(session.id);

  const res = ok({ loggedOut: true });
  res.headers.set("Set-Cookie", clearSessionCookie());
  return res;
});
