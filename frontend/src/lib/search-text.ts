/**
 * Chuẩn hoá chuỗi để tìm kiếm.
 *
 * Khách hay gõ không dấu ("meo anh long ngan") nên mọi ô tìm kiếm đều bỏ dấu
 * cả từ khoá lẫn dữ liệu trước khi so khớp. `đ` phải xử lý riêng vì nó không
 * phải là "d + dấu" nên NFD không tách ra được.
 */
export function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

/** `true` nếu bất kỳ trường nào chứa từ khoá đã chuẩn hoá. */
export function matchesQuery(
  normalizedQuery: string,
  ...fields: (string | undefined | null)[]
): boolean {
  if (!normalizedQuery) return true;
  return fields.some((f) => f && normalizeSearch(f).includes(normalizedQuery));
}
