// U+0300..U+036F is the combining-diacritics block NFD leaves behind.
const COMBINING_MARKS = /[̀-ͯ]/g;

/**
 * Bỏ dấu tiếng Việt + hạ chữ thường, để ô tìm kiếm gõ "cho corgi" vẫn khớp
 * "Chó Corgi" — admin thường gõ không dấu cho nhanh.
 */
export function normalizeVi(input: string) {
  return input
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

/** True nếu `needle` rỗng, hoặc khớp bất kỳ trường nào trong `fields`. */
export function matchesSearch(needle: string, ...fields: (string | null | undefined)[]) {
  const q = normalizeVi(needle);
  if (!q) return true;
  return fields.some((f) => f && normalizeVi(f).includes(q));
}
