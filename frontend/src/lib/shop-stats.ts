/**
 * ==========================================================================
 *  CON SỐ VỀ CỬA HÀNG — SỬA Ở ĐÂY, ĐỪNG SỬA RẢI RÁC TRONG COMPONENT
 * ==========================================================================
 *
 * Đây là những con số khách sẽ hiểu là thành tích có thật của shop. Trước đây
 * chúng nằm rải rác và mâu thuẫn nhau: một trang ghi "15 năm kinh nghiệm",
 * trang khác ghi "hơn 1 năm", còn "10.000+ bé đã về nhà mới" thì không có căn
 * cứ nào. Gom về một chỗ để lúc nào cũng khớp nhau.
 *
 * Nguyên tắc: chỉ điền con số bạn dám nói trước mặt khách. Quảng cáo quá lời
 * không chỉ mất uy tín — theo Luật Bảo vệ quyền lợi người tiêu dùng thì đưa
 * thông tin sai lệch về hoạt động kinh doanh còn là hành vi bị cấm.
 */

/** Năm cửa hàng bắt đầu hoạt động. Dùng để tự tính số năm kinh nghiệm. */
export const FOUNDED_YEAR = 2025;

/** Số bé đã tìm được nhà mới. Cập nhật theo sổ bán hàng thật. */
export const PETS_REHOMED = 120;

/** Số lượt tắm/cắt tỉa đã thực hiện tại tiệm. */
export const GROOMING_SESSIONS = 350;

/** Số năm hoạt động, tự tính nên không bao giờ lệch với `FOUNDED_YEAR`. */
export function yearsInBusiness(): number {
  return Math.max(1, new Date().getFullYear() - FOUNDED_YEAR);
}
