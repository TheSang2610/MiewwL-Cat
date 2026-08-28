import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/http";

/**
 * Dựng phần dữ liệu giống cho một sản phẩm khi tạo hoặc sửa.
 *
 * Sản phẩm lưu giống ở hai chỗ, có chủ đích:
 *  - `breedId` là khoá thật, dùng để đếm "còn mấy bé" trên trang giống.
 *  - `breed` là tên để hiển thị, nhân đôi ra để thẻ sản phẩm và ô tìm kiếm
 *    không phải nạp kèm bảng giống ở mọi truy vấn.
 *
 * Hai chỗ đó chỉ an toàn khi luôn được ghi cùng lúc, nên mọi đường ghi sản phẩm
 * đều phải đi qua hàm này. Trước đây `breed` là ô gõ tay riêng lẻ, gõ "Poodle"
 * trong khi thư viện tên "Poodle Tiny" là trang giống báo hết bé dù kho còn.
 *
 * Trả về:
 *  - `{}` khi client không gửi `breedId` — giữ nguyên giá trị cũ.
 *  - `{ breedId: null, breed: null }` khi gửi `null` — gỡ liên kết, dùng cho
 *    đồ dùng và dịch vụ spa vốn không thuộc giống nào.
 */
export async function breedLinkData(
  breedId: string | null | undefined
): Promise<{ breedId?: string | null; breed?: string | null }> {
  if (breedId === undefined) return {};
  if (breedId === null || breedId === "") return { breedId: null, breed: null };

  const breed = await prisma.breed.findUnique({
    where: { id: breedId },
    select: { name: true },
  });
  if (!breed) {
    throw new ApiError("Không tìm thấy giống này trong thư viện giống", 422);
  }

  return { breedId, breed: breed.name };
}
