/**
 * ==========================================================================
 *  ĐÁNH GIÁ CỦA KHÁCH — CHỈ ĐIỀN ĐÁNH GIÁ CÓ THẬT
 * ==========================================================================
 *
 * Danh sách này đang TRỐNG, và khu vực đánh giá trên trang sẽ tự ẩn khi trống.
 * Đó là cố ý: đánh giá bịa ra là thứ khách phát hiện rất nhanh, và theo Luật
 * Bảo vệ quyền lợi người tiêu dùng thì đưa thông tin sai lệch để bán hàng là
 * hành vi bị cấm.
 *
 * Khi có đánh giá thật (tin nhắn Zalo, bình luận Facebook, khách nhắn lại...),
 * xin phép khách rồi thêm vào đây theo mẫu:
 *
 *   {
 *     name: "Chị Minh Anh",
 *     petName: "Bông",
 *     breed: "Corgi",
 *     rating: 5,
 *     quote: "Bé khoẻ mạnh, đúng như cam kết. Shop tư vấn tận tình.",
 *     quoteEn: "A healthy puppy, exactly as promised. The shop was very helpful.",
 *   },
 *
 * `quoteEn` để trống thì bản tiếng Anh sẽ hiện nguyên văn tiếng Việt — chấp
 * nhận được, vì đây là lời của khách chứ không phải chữ của website.
 */
export interface Testimonial {
  name: string;
  petName?: string;
  breed?: string;
  /** 1-5 sao. */
  rating: number;
  quote: string;
  quoteEn?: string;
}

export const TESTIMONIALS: Testimonial[] = [];
