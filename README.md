# MiewwL Pet House

Website cửa hàng thú cưng: bán mèo và chó thuần chủng, đồ dùng phụ kiện, nhận
đặt lịch spa — kèm khu quản trị phân quyền và cẩm nang chăm sóc song ngữ.

```
test-project/
  frontend/   Next.js 16 — giao diện khách + khu quản trị   (cổng 3000)
  backend/    Next.js 16 — REST API + Prisma/MongoDB        (cổng 3001)
```

Hai project **độc lập hoàn toàn**, deploy riêng. Frontend chỉ nói chuyện với
backend qua HTTP, không dùng chung code.

**Đang có sẵn:** 23 giống (10 mèo, 13 chó) · 20 sản phẩm · 20 bài cẩm nang ·
120 ảnh tự host.

---

## 1. Chạy ở máy

Phải chạy **cả hai**, backend trước.

```bash
# Backend  -> http://localhost:3001
cd backend
cp .env.example .env          # điền DATABASE_URL
npm install
npm run db:push               # tạo collection theo schema
npm run db:seed               # dữ liệu mẫu + tài khoản
npm run dev

# Frontend -> http://localhost:3000
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Backend chưa chạy thì frontend hiện "Không kết nối được máy chủ" kèm nút Thử
lại, chứ không vỡ trang.

> **Repo không chứa file `.env`** — chúng nằm trong `.gitignore`. Phải tự tạo
> từ `.env.example` của từng thư mục, và bắt buộc điền `DATABASE_URL` với
> `AUTH_SECRET` thì API mới chạy.

### Tài khoản sau khi seed

| Vai trò | Email | Mật khẩu | Vào được |
|---|---|---|---|
| Quản trị | theo `ADMIN_EMAIL` | theo `ADMIN_PASSWORD` | tất cả |
| Nhân viên | `nhanvien@miewwl.vn` | `123456` | đơn hàng, lịch spa |
| Khách hàng | `khachhang@gmail.com` | `123456` | không vào khu quản trị |

`ADMIN_PASSWORD` **bắt buộc, tối thiểu 8 ký tự** — seed dừng lại nếu thiếu.
Không có giá trị mặc định là cố ý: repo công khai nên mặc định nào cũng là mật
khẩu quản trị mà ai đọc repo cũng biết.

Hai tài khoản mẫu bên dưới chỉ được tạo khi đặt `SEED_DEMO_USERS="true"`. Đừng
bật trên database thật — mật khẩu `123456` nằm sẵn trong repo, mà tài khoản
nhân viên thì xem được tên, số điện thoại và địa chỉ của mọi khách đã đặt hàng.

---

## 2. Deploy lên Vercel

Deploy thành **hai dự án Vercel riêng** từ cùng một repo. Làm backend trước, vì
frontend cần biết địa chỉ API.

### 2.1. Backend

1. Vercel → **Add New Project** → chọn repo này.
2. **Root Directory**: `backend`.
3. Environment Variables:

   | Biến | Giá trị |
   |---|---|
   | `DATABASE_URL` | Chuỗi kết nối MongoDB Atlas |
   | `ADMIN_EMAIL` | Email tài khoản quản trị |
   | `ADMIN_PASSWORD` | **Bắt buộc, ≥ 8 ký tự.** Tài khoản này duyệt tiền của khách |
   | `AUTH_SECRET` | **Bắt buộc.** Chuỗi ngẫu nhiên ≥ 32 ký tự để ký token đăng nhập |
   | `CORS_ORIGIN` | Tên miền frontend, nhiều thì ngăn bằng dấu phẩy |
   | `ALLOW_VERCEL_PREVIEWS` | `true` nếu muốn bản preview gọi được API |

   Sinh `AUTH_SECRET`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
   ```
   Thiếu biến này thì API **không khởi động được** — cố ý, để không ai vô tình
   chạy production với chuỗi ký đoán được. Đổi chuỗi = mọi người đang đăng nhập
   bị đăng xuất hết.

4. Deploy, rồi mở `https://<backend>.vercel.app/api/health` — phải trả
   `{"data":{"ok":true,...}}`.

> **MongoDB Atlas:** vào Network Access thêm `0.0.0.0/0`. Vercel dùng IP động
> nên không allowlist theo IP cố định được.

> **Prisma:** script `build` đã có sẵn `prisma generate` phía trước. Bỏ phần đó
> ra là build hỏng, vì Vercel cache `node_modules` và bỏ qua `postinstall` từ
> lần deploy thứ hai trở đi.

### 2.2. Frontend

1. **Add New Project** từ cùng repo, **Root Directory**: `frontend`.
2. Environment Variables:

   | Biến | Giá trị |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | `https://<backend>.vercel.app/api` — **nhớ `/api` ở cuối** |
   | `NEXT_PUBLIC_SITE_URL` | Tên miền thật, ví dụ `https://miewwl.vn`. Bỏ trống thì Vercel tự điền |
   | `NEXT_PUBLIC_BANK_BIN` | Mã BIN ngân hàng, `970418` = BIDV |
   | `NEXT_PUBLIC_BANK_NAME` | Tên ngắn hiện cho khách, ví dụ `BIDV` |
   | `NEXT_PUBLIC_BANK_ACCOUNT_NO` | Số tài khoản nhận tiền |
   | `NEXT_PUBLIC_BANK_ACCOUNT_NAME` | Tên chủ tài khoản, in hoa không dấu |

   Thiếu bốn biến ngân hàng thì trang thanh toán không hiện QR mà báo khách gọi
   hotline. Đơn vẫn được lưu, chỉ là không chuyển khoản được.

3. Deploy.

### 2.3. Sau khi deploy

- Nạp dữ liệu cho database production: từ máy, trỏ `DATABASE_URL` vào DB thật
  rồi chạy `npm run db:seed` trong `backend`.
- Quay lại backend, sửa `CORS_ORIGIN` thành đúng tên miền frontend, redeploy.
- Kiểm tra `/sitemap.xml` và `/robots.txt` của frontend.

---

## 3. Bản đồ trang

URL **phẳng** — không dùng dynamic segment, id đi qua query string.

### Phần khách

| Trang | URL |
|---|---|
| Trang chủ | `/` |
| Các bé mèo | `/meo` |
| Các bé chó | `/cho` |
| Đồ dùng & phụ kiện | `/phu-kien` |
| Spa & Grooming | `/spa` |
| Chăm sóc theo giống | `/cham-soc` |
| Cẩm nang | `/blog` · `/blog-post?slug=` |
| Chi tiết giống | `/breed-detail?slug=` |
| Chi tiết sản phẩm / thú cưng | `/product-detail?id=` |
| Thanh toán | `/checkout` |
| Chuyển khoản VietQR | `/checkout-payment?orderId=` |
| Đặt hàng thành công | `/checkout-success?orderId=` |
| Tài khoản & đổi mật khẩu | `/tai-khoan` |
| Đơn hàng của tôi | `/account-orders` |
| Đăng nhập / Đăng ký | `/dang-nhap` · `/dang-ky` |
| Nguồn ảnh | `/nguon-anh` |

### Khu quản trị

`/admin-login` · `/admin` · `/admin-products` · `/admin-product-new` ·
`/admin-product-edit?id=` · `/admin-breeds` · `/admin-breed-new` ·
`/admin-breed-edit?id=` · `/admin-orders` · `/admin-spa-bookings` ·
`/admin-users`

Các trang admin nằm trong route group `src/app/(admin)/`. Dấu ngoặc khiến thư
mục **không** xuất hiện trong URL, nên vẫn giữ được URL phẳng mà chung một
layout: sidebar + chặn theo vai trò.

---

## 4. Những việc hay phải làm

### Thêm sản phẩm hoặc bé mới
Làm ở trang quản trị `/admin-product-new`. Nhập tiếng Việt như bình thường.
Muốn bản tiếng Anh hiện đúng thì thêm một dòng vào
`frontend/src/lib/content-en.ts` (xem mục 6).

### Thêm giống mới
Sửa `backend/prisma/breeds-extra.ts` rồi chạy `npm run db:breeds`. Lệnh này chỉ
thêm/cập nhật theo `slug`, **không xoá** đơn hàng hay tài khoản.

### Ảnh tải lên không hiện ở trang khách (chỉ khi chạy ở máy)
Nếu ảnh hiện trong trang quản trị mà mất ở trang khách: hai nơi đi hai đường
khác nhau — quản trị dùng thẻ `<img>` thường, trang khách dùng `next/image` nên
phải qua bộ tối ưu ảnh. Next 16 chặn bộ tối ưu lấy ảnh từ host phân giải ra IP
nội bộ (chống SSRF), mà khi chạy ở máy thì backend chính là `localhost:3001`.

Đã xử lý bằng `images.dangerouslyAllowLocalIP` trong `next.config.ts`, chỉ bật ở
chế độ dev. Trên Vercel backend là tên miền công khai nên không dính, và bản
chạy thật vẫn giữ nguyên lớp chống SSRF.

Dấu hiệu nhận ra: log của `next dev` in `hostname resolved to private IP`. Đừng
tin câu lỗi HTTP trả về — Next dùng chung câu `"url" parameter is not allowed`
cho cả trường hợp này lẫn trường hợp sai `remotePatterns`, rất dễ đi nhầm hướng.

### Đổi ảnh sản phẩm / giống
**Cách nhanh nhất:** mở form sửa trong trang quản trị → bấm **"Tải ảnh từ máy"**.
Ảnh được lưu thẳng trong database và phục vụ qua `/api/uploads/<id>`, không cần
đăng ký dịch vụ lưu trữ nào. Giới hạn 3 MB mỗi ảnh, nhận JPEG/PNG/WebP/AVIF.

**Cách thủ công** (dùng cho ảnh dùng lại nhiều nơi): chép file vào
`frontend/public/breeds` (hoặc `supplies`, `blog`), sửa đường dẫn trong
`breeds.ts` / `update-images.ts`, rồi `npm run db:images`. Nhớ thêm dòng ghi
công vào `frontend/src/data/image-credits.ts`.

### Khách quên mật khẩu
Vào `/admin-users`, bấm **"Đặt lại mật khẩu"** ở dòng của khách. Hệ thống sinh
mật khẩu tạm 12 ký tự, hiện **đúng một lần** để bạn đọc cho khách qua điện
thoại. Mọi phiên cũ của khách bị đăng xuất ngay. Nhắc khách vào `/tai-khoan`
đổi lại mật khẩu của riêng họ.

> Chỉ làm sau khi đã xác minh đúng là chủ tài khoản — đây là thao tác chiếm
> được tài khoản người khác nếu làm ẩu.

### Thêm đánh giá của khách
`frontend/src/data/testimonials.ts`. File đang **trống có chủ đích** và khu vực
đánh giá tự ẩn — chỉ điền đánh giá có thật, đã xin phép khách.

### Nhập bản tiếng Anh cho sản phẩm / giống
Ngay trong form quản trị, mở khối **"Bản tiếng Anh (không bắt buộc)"**. Điền vào
đó là bản EN hiện đúng ngay, không cần sửa code. Bỏ trống thì site tra từ điển
`content-en.ts`; không có trong từ điển nữa thì giữ nguyên tiếng Việt.

### Sao lưu database
```bash
npm run db:backup -- "$DATABASE_URL" ../backup-2026-08-29.json
```
Xuất mọi bảng ra một file JSON (ảnh trong bảng `upload` đổi sang base64). Chạy
trước mỗi lần đụng vào dữ liệu thật. **Đừng để file này trong repo** — nó chứa
tên, số điện thoại và địa chỉ của khách.

### Chuyển sang database khác
MongoDB không có lệnh đổi tên database, và Atlas cũng không có nút đó — muốn
đổi tên, hoặc muốn tách database thật khỏi database chạy thử, đều là chép sang
rồi bỏ cái cũ:

```bash
npm run db:backup -- "<url-cu>" ../backup.json     # sao lưu trước đã
npm run db:copy -- "<url-cu>" "<url-moi>"          # chi chep, khong xoa gi
npm run db:verify-copy -- "<url-cu>" "<url-moi>"   # doi chieu sau
npm run db:count -- "<url>"                        # dem nhanh mot ben
```

`db:copy` giữ nguyên `id` của mọi bản ghi nên các liên kết (đơn ↔ dòng hàng,
sản phẩm ↔ danh mục) vẫn trỏ đúng, và nó từ chối chạy nếu database đích đã có
dữ liệu. `db:verify-copy` mới là bước quan trọng: đếm bằng nhau không chứng minh
được gì, vì nếu `id` bị sinh lại thì số lượng vẫn khớp trong khi mọi liên kết
đã đứt.

Đổi `DATABASE_URL` sang database mới, chạy lại, xác nhận web đúng rồi mới xoá
database cũ trong Atlas.

### Quản trị viên quên mật khẩu
Không bấm được nút "Đặt lại mật khẩu" ở trang phân quyền (vì không đăng nhập
được), mà cũng không chạy `db:seed` được (seed xoá sạch đơn hàng và sản phẩm).
Dùng script trong `backend`:

```bash
npm run admin:password -- "mat-khau-moi-that-dai"
npm run admin:password -- "mat-khau-moi" email@khac.com   # đổi cho người khác
```

Script sửa đúng database mà `DATABASE_URL` đang trỏ tới, và đá mọi thiết bị
đang đăng nhập tài khoản đó ra.

### Đổi mật khẩu
Khách và nhân viên tự đổi ở `/tai-khoan`. Phải nhập lại mật khẩu hiện tại.

### Sửa con số về cửa hàng
`frontend/src/lib/shop-stats.ts` — số bé đã bán, số lượt spa, năm thành lập.
Gom về một chỗ để các trang không nói vênh nhau.

### Đổi tài khoản ngân hàng
Sửa bốn biến `NEXT_PUBLIC_BANK_*` — trong `frontend/.env.local` khi chạy ở máy,
hoặc Settings → Environment Variables trên Vercel. **Số tài khoản cố tình không
nằm trong repo**: repo công khai thì nó nằm vĩnh viễn trong lịch sử git và bị máy
quét thu thập, kể cả sau khi cửa hàng đã đổi sang tài khoản khác.

Mã QR do VietQR sinh, đã nhúng sẵn số tiền và nội dung chuyển khoản của từng đơn.
Đổi ngân hàng thì tra mã BIN tại <https://api.vietqr.io/v2/banks>.

### Đổi tỷ giá USD
`frontend/src/lib/currency.ts` — `VND_PER_USD`. Số cố định, không tự cập nhật.

---

## 5. Frontend

### Tổ chức

| Đường dẫn | Việc |
|---|---|
| `src/lib/api.ts` | Toàn bộ lời gọi HTTP, bóc `{data}`, ném `ApiError` kèm status |
| `src/lib/use-async.ts` | Hook fetch cho trang chi tiết, huỷ request cũ khi id đổi |
| `src/lib/permissions.ts` | Bản đồ vai trò ↔ route của khu quản trị |
| `src/lib/site.ts` | Tên miền công khai, dùng cho sitemap và Open Graph |
| `src/lib/search-text.ts` | Bỏ dấu để gõ không dấu vẫn tìm ra |
| `src/store/*` | Zustand; thứ cần nhớ qua lần tải thì `persist` vào localStorage |
| `src/data/blog/` | Nội dung cẩm nang, tách theo chuyên mục |
| `src/data/image-credits.ts` | Ghi công ảnh (xem mục 7) |

### Chức năng đáng chú ý

- **Tìm kiếm toàn site** (nút kính lúp trên header): tìm cùng lúc thú cưng,
  giống, phụ kiện và bài cẩm nang. Gõ không dấu vẫn ra. `Esc` để đóng.
- **Lọc & sắp xếp** ở trang phụ kiện: tìm theo từ khoá, sắp theo giá/tên, lọc
  còn hàng.
- **Cẩm nang** có lọc chuyên mục, tìm trong thân bài, mục lục, bài liên quan,
  điều hướng bài trước/sau.
- **Giỏ hàng** lưu localStorage; đơn hàng thì tính lại giá ở server.
- **404 và ranh giới lỗi** dùng giao diện của shop, không phải màn hình mặc định
  của Next.
- **SEO**: `sitemap.xml`, `robots.txt` (chặn khu quản trị và trang riêng tư),
  metadata riêng cho từng trang, thẻ Open Graph.

---

## 6. Song ngữ VI / EN

Hai lớp dịch tách bạch:

| File | Lo phần nào |
|---|---|
| `src/lib/messages.ts` | Chữ cố định của giao diện. Khoá được TypeScript kiểm tra, thiếu một khoá là báo lỗi lúc build |
| Trường `*En` trong database | Bản tiếng Anh shop tự nhập ở trang quản trị — **ưu tiên cao nhất** |
| `src/lib/content-en.ts` | Từ điển dự phòng cho nội dung database: tên sản phẩm, mô tả, tag, ghi chú chăm sóc |
| `src/lib/i18n.ts` | Chốt quy tắc **khu quản trị luôn tiếng Việt**, dù khách đang bật EN |

Vài điểm cần nhớ:

- **Đơn hàng và lịch spa luôn lưu tên tiếng Việt** vào database, để trang quản
  trị đọc đúng dù khách đặt hàng ở bản tiếng Anh.
- Tag viết hoa hay viết thường chỉ cần **một dòng** trong `content-en.ts` —
  chữ đầu tự chỉnh theo bản gốc.
- Chuỗi chưa có bản dịch sẽ **giữ nguyên tiếng Việt**, không hiện chuỗi rỗng.
- Thứ tự ưu tiên khi dịch nội dung database: **trường `*En` shop nhập → từ điển
  `content-en.ts` → giữ nguyên tiếng Việt**.
- Tỷ giá USD lấy từ `/api/exchange-rate` (cache 12 tiếng), hỏng thì rơi về
  `FALLBACK_VND_PER_USD` trong `currency.ts`.
- Bấm EN còn hiện thêm dòng quy đổi USD dưới giá VNĐ. Nhưng **tiền chuyển khoản
  thật vẫn là VNĐ** vì tài khoản ngân hàng là tài khoản VNĐ — trang chuyển khoản
  có ghi rõ điều này bằng tiếng Anh.

---

## 7. Ảnh

Ảnh giống, phụ kiện và cẩm nang nằm trong
`frontend/public/{breeds,supplies,blog}` — tải từ Wikimedia Commons và **tự
host**, không hotlink.

Phần lớn ở giấy phép Creative Commons **yêu cầu ghi công tác giả**. Danh sách
đầy đủ 120 ảnh nằm ở `src/data/image-credits.ts` và hiển thị tại `/nguon-anh`.
**Đừng xoá trang đó** khi còn dùng các ảnh này.

Khi cửa hàng chụp được ảnh thật của chính các bé đang bán thì nên thay dần: vừa
đúng luật hơn, vừa bán hàng tốt hơn ảnh minh hoạ.

Catalogue giống chia hai file: `backend/prisma/breeds.ts` (12 giống nền tảng) và
`breeds-extra.ts` (11 giống mở rộng). Mô tả và hướng dẫn chăm sóc đều do cửa
hàng tự biên soạn.

---

## 8. Backend

REST API, dùng dynamic segment `[id]` theo chuẩn REST.

| Method | Route | Ghi chú |
|---|---|---|
| GET | `/api/health` | Kiểm tra kết nối DB |
| GET · POST | `/api/categories` | |
| GET · POST | `/api/products` | `?category=` `?q=` `?published=` |
| GET · PUT · DELETE | `/api/products/:id` | DELETE sẽ **ẩn** thay vì xoá nếu đã nằm trong đơn |
| GET · POST | `/api/breeds` | `?species=` `?published=` |
| GET · PUT · DELETE | `/api/breeds/:id` | Nhận cả `id` lẫn `slug` |
| GET · POST | `/api/orders` | POST tính lại giá từ DB, trừ tồn kho trong transaction |
| GET · PATCH | `/api/orders/:id` | Chặn chuyển trạng thái khi tiền chưa về |
| GET · POST | `/api/spa-bookings` | |
| PATCH | `/api/spa-bookings/:id` | |
| GET | `/api/users` | Không bao giờ trả `passwordHash` |
| PATCH | `/api/users/:id` | Đổi vai trò; chỉ ADMIN, không tự hạ quyền, không hạ admin cuối cùng |
| GET · POST | `/api/subscribers` | Đăng ký nhận tin ở chân trang |
| GET | `/api/exchange-rate` | Tỷ giá VND/USD, cache 12 tiếng, có số dự phòng |
| POST | `/api/auth/login` | bcrypt; đặt cookie phiên + trả `token` dự phòng |
| POST | `/api/auth/register` | Luôn ép vai trò `CUSTOMER`, không nhận role từ client |
| GET | `/api/auth/me` | Hồ sơ phiên hiện tại; cũng để dò cookie có chạy không |
| POST | `/api/auth/logout` | Xoá cookie phiên (JS không tự xoá được HttpOnly) |
| POST | `/api/auth/change-password` | Bắt nhập lại mật khẩu hiện tại; thu hồi phiên cũ |
| POST | `/api/users/:id/reset-password` | Quản trị cấp mật khẩu tạm cho khách quên mật khẩu |
| GET · POST | `/api/uploads` | Ảnh shop tải lên; POST chỉ quản trị |
| GET · DELETE | `/api/uploads/:id` | GET công khai (ảnh sản phẩm), DELETE chỉ quản trị |

Response: `{ "data": ... }` khi thành công, `{ "error": { message, details } }`
khi lỗi. Mã lỗi: `409` xung đột · `422` sai dữ liệu · `404` · `403` · `401` ·
`500`.

### Xác thực & phân quyền

Đăng nhập trả về **JWT ký HMAC-SHA256**, sống 7 ngày. Client gửi kèm
`Authorization: Bearer <token>` ở mọi request; server tự quyết route nào cần
quyền gì.

| Nhóm | Ai gọi được |
|---|---|
| Xem sản phẩm, giống, danh mục | **Ai cũng được** — không cần đăng nhập |
| Đặt hàng, đặt lịch spa, đăng ký nhận tin | **Ai cũng được** — khách vãng lai vẫn mua hàng bình thường |
| Báo "tôi đã chuyển khoản" | **Ai cũng được** — khách vãng lai cũng phải báo được |
| Xem/cập nhật đơn, lịch spa | Nhân viên & quản trị |
| Xác nhận **đã nhận tiền**, đổi trạng thái giao hàng | Nhân viên & quản trị |
| Thêm/sửa/xoá sản phẩm, giống, danh mục | Chỉ quản trị |
| Xem danh sách tài khoản, đổi vai trò, xem email đăng ký | Chỉ quản trị |

Vài điểm quan trọng:

- **Khách hàng chỉ thấy đơn của chính mình.** `GET /api/orders?userId=` từ
  client bị bỏ qua và thay bằng id trong token — nếu không, ai cũng đọc được
  đơn người khác bằng cách đổi tham số trên URL.
- **Danh tính người đổi vai trò lấy từ token**, không lấy từ body. Trước đây
  route nhận `actorId` do client gửi, tức là ai cũng khai mình là admin được.
- Sai vai trò trả **403**, chưa đăng nhập trả **401** — hai lỗi khác nhau để
  giao diện hiển thị đúng thông báo.
- **Đăng xuất thu hồi token ngay.** Mỗi tài khoản có mốc `sessionsValidFrom`;
  token phát trước mốc đó bị từ chối. Đặt lại mốc khi đăng xuất, đổi mật khẩu,
  hoặc quản trị đặt lại mật khẩu — nên token bị lộ không còn sống hết 7 ngày.
- **Vai trò đọc từ database, không đọc từ token.** Hạ quyền ai đó có hiệu lực
  ngay, không phải đợi token của họ hết hạn. Cái giá là một truy vấn cho mỗi
  request cần quyền; các trang công khai không đi qua đó.
- Phiên chết giữa chừng thì giao diện tự dọn trạng thái đăng nhập và đưa về
  trang đăng nhập (`SessionWatcher` trong `layout.tsx`), chứ không để khách
  thấy tên mình trong khi mọi thao tác đều hỏng.

**Token đi theo cookie `HttpOnly`** — JavaScript trên trang không đọc được, nên
site dính XSS thì phiên vẫn an toàn. Cookie chỉ tới được API khi web và API
**cùng site**:

| Cách deploy | Cookie | Kết quả |
|---|---|---|
| `localhost:3000` + `localhost:3001` | ✅ | Dùng cookie, không lưu token |
| `miewwl.vn` + `api.miewwl.vn` | ✅ | Dùng cookie, không lưu token — **nên chọn cách này** |
| `web.vercel.app` + `api.vercel.app` | ❌ | Rơi về `Authorization: Bearer`, token nằm trong localStorage |

Cách thứ ba không dùng được cookie vì `.vercel.app` nằm trong Public Suffix
List nên trình duyệt coi hai tên miền đó là khác site. Sau khi đăng nhập,
frontend tự gọi `/auth/me` để **dò** xem cookie có tới nơi không: tới được thì
xoá token khỏi localStorage luôn, không tới được mới giữ lại làm dự phòng.

> Muốn bỏ hẳn localStorage: trỏ API vào một subdomain cùng tên miền với web.

### Hai nguyên tắc không được phá

1. **Giá đơn hàng luôn tính lại ở server** từ giá trong database. Client chỉ gửi
   `productId` và `quantity`, không gửi giá.
2. **Đơn chuyển khoản chỉ chuyển trạng thái khi tiền đã về.** `paymentStatus`
   tách riêng khỏi `status`, vì một đơn có thể đang giao mà chưa trả tiền (COD)
   hoặc đã trả mà chưa gửi đi (chuyển khoản).

### CORS

Nằm ở `backend/src/proxy.ts` — Next 16 đã đổi tên quy ước `middleware` thành
`proxy`. Soi origin của từng request nên hợp được với tên miền động của bản
preview trên Vercel; header khai tĩnh trong `next.config.ts` thì không.

### Lệnh database

```bash
cd backend
npm run db:push     # đồng bộ schema
npm run db:seed     # tạo lại toàn bộ dữ liệu mẫu — XOÁ dữ liệu cũ
npm run db:breeds   # thêm/cập nhật catalogue giống, KHÔNG xoá gì
npm run db:images   # chỉ cập nhật ảnh, KHÔNG xoá đơn hàng/tài khoản
npm run db:studio   # xem dữ liệu bằng Prisma Studio
```

---

## 9. Việc còn lại

Những gì còn thiếu đều là thứ **cần tài khoản dịch vụ bên ngoài hoặc cần chính
cửa hàng làm**, không phải thứ viết thêm code là xong.

### Cần cửa hàng tự làm

- **Ảnh phụ kiện chưa phải ảnh chụp studio.** Ảnh hiện tại lấy từ Wikimedia
  Commons — đúng loại sản phẩm nhưng là ảnh nghiệp dư, vì Commons không có ảnh
  sản phẩm thương mại. Cách duy nhất là tự chụp; nút **"Tải ảnh từ máy"** trong
  trang quản trị làm việc đó chỉ mất vài giây.
- **Chưa có đánh giá của khách.** `src/data/testimonials.ts` để trống có chủ
  đích và khu vực đánh giá tự ẩn. Chỉ điền đánh giá thật, đã xin phép khách.
- **Con số về cửa hàng là ước lượng.** Sửa `src/lib/shop-stats.ts` theo sổ bán
  hàng thật.

### Cần dịch vụ bên ngoài

- **Quên mật khẩu chưa tự động.** Đã có quy trình quản trị cấp mật khẩu tạm qua
  hotline, nhưng gửi link đặt lại qua email thì cần dịch vụ gửi mail (Resend,
  SendGrid...) và một tên miền đã xác thực.
- **Ảnh tải lên đang lưu trong MongoDB.** Đủ cho vài trăm ảnh của một cửa hàng,
  nhưng gói miễn phí Atlas chỉ có 512 MB. Khi kho ảnh lớn dần nên chuyển sang
  object storage (Vercel Blob, Cloudinary, S3) — chỉ phải sửa phần đọc/ghi
  trong `api/uploads`, dữ liệu sản phẩm không đụng tới.

### Giới hạn đã biết, chấp nhận được

- **Tiêu đề tab chỉ đổi sau khi hydrate.** Công cụ tìm kiếm đọc bản tiếng Việt
  do server dựng — đúng ý đồ, vì nội dung gốc của site là tiếng Việt.
- **Token nằm trong localStorage nếu deploy khác site.** Xem bảng ở mục 8; đặt
  API ở subdomain cùng tên miền là hết.
- **Tỷ giá USD cache 12 tiếng.** Không cần chính xác từng phút vì đây chỉ là số
  quy đổi tham khảo, tiền chuyển khoản thật vẫn là VNĐ.
- `prisma/backfill-payment-status.ts` là script di trú chạy một lần, đã xong.
  Giữ lại làm hồ sơ thay đổi dữ liệu, xoá đi cũng không sao.
