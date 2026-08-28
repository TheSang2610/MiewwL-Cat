"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + lifts its children into view the first time they're scrolled to.
 * `delay` staggers siblings so a group animates in sequence.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Older browsers (and any environment without IO) just show the content.
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-revealed={revealed}
      style={{ transitionDelay: `${delay}ms` }}
      className={`translate-y-3 opacity-0 transition-all duration-700 ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}
