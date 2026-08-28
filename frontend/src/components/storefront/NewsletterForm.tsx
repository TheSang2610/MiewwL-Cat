"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { useT } from "@/lib/i18n";

type State = "idle" | "sending" | "done" | "already" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Form nhận tin ở chân trang.
 *
 * Trước đây ô này chỉ là input trơn không gắn với gì cả — bấm Gửi không xảy ra
 * chuyện gì. Giờ nó gọi thật `POST /api/subscribers`; email trùng vẫn báo thành
 * công vì với khách thì kết quả là như nhau.
 */
export default function NewsletterForm() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;

    if (!EMAIL_RE.test(email.trim())) {
      setState("error");
      setMessage(t("footer.invalidEmail"));
      return;
    }

    setState("sending");
    try {
      const result = await api.subscribers.create(email.trim());
      setState(result.created ? "done" : "already");
      setMessage(result.created ? t("footer.subscribed") : t("footer.alreadySubscribed"));
      setEmail("");
    } catch (err) {
      setState("error");
      setMessage(
        err instanceof ApiError && err.status === 422
          ? t("footer.invalidEmail")
          : t("error.desc")
      );
    }
  };

  const succeeded = state === "done" || state === "already";

  return (
    <form onSubmit={submit} noValidate>
      <div className="flex">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          placeholder={t("footer.emailPlaceholder")}
          aria-label={t("footer.emailPlaceholder")}
          className="w-full border border-brand-deep/15 bg-white px-3 py-2 text-xs focus:border-brand-deep focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="whitespace-nowrap bg-brand-deep px-4 py-2 text-xs uppercase text-white transition-colors hover:bg-brand-deep/90 disabled:opacity-50"
        >
          {state === "sending" ? t("footer.sending") : t("footer.send")}
        </button>
      </div>

      {message && (
        <p
          role="status"
          className={`mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed ${
            succeeded ? "text-emerald-700" : "text-rose-600"
          }`}
        >
          {succeeded && <Check className="mt-0.5 h-3 w-3 shrink-0" />}
          {message}
        </p>
      )}
    </form>
  );
}
