"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 90;
const ERASE_MS = 45;
const HOLD_MS = 1800;
const PAUSE_MS = 250;

/**
 * Types each phrase out, holds, erases, then moves to the next one.
 * Renders the first phrase in full on the server so the sentence around it
 * never reflows on hydration.
 */
export default function Typewriter({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(phrases[0] ?? "");
  const [erasing, setErasing] = useState(false);
  const [started, setStarted] = useState(false);

  // Start empty only once we're on the client, so SSR output stays complete.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setStarted(true);
      setText("");
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Every transition is scheduled on a timer, so no state is set synchronously
  // inside the effect body (which would cause cascading re-renders).
  useEffect(() => {
    if (!started || phrases.length === 0) return;

    const full = phrases[index];

    if (!erasing) {
      const done = text === full;
      const timer = setTimeout(
        () => (done ? setErasing(true) : setText(full.slice(0, text.length + 1))),
        done ? HOLD_MS : TYPE_MS
      );
      return () => clearTimeout(timer);
    }

    if (text === "") {
      const next = setTimeout(() => {
        setErasing(false);
        setIndex((i) => (i + 1) % phrases.length);
      }, PAUSE_MS);
      return () => clearTimeout(next);
    }

    const tick = setTimeout(() => setText(text.slice(0, -1)), ERASE_MS);
    return () => clearTimeout(tick);
  }, [started, text, erasing, index, phrases]);

  return (
    <span className="font-semibold text-brand-deep">
      <span>{text}</span>
      <span className="inline-block animate-pulse" aria-hidden="true">
        |
      </span>
    </span>
  );
}
