import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ error: { message, details } }, { status });
}

/** A rejection the client caused and can act on — not a server fault. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status = 400
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Wraps a route handler so validation and unexpected errors become
 * consistent JSON instead of an HTML error page.
 */
export function handle<T extends unknown[]>(
  fn: (...args: T) => Promise<Response>
) {
  return async (...args: T): Promise<Response> => {
    try {
      return await fn(...args);
    } catch (err) {
      if (err instanceof ZodError) {
        return fail("Dữ liệu gửi lên không hợp lệ", 422, err.issues);
      }
      if (err instanceof ApiError) {
        return fail(err.message, err.status);
      }
      console.error("[api]", err);
      const message = err instanceof Error ? err.message : "Lỗi máy chủ";
      return fail(message, 500);
    }
  };
}
