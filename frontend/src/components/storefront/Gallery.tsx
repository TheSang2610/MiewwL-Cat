"use client";

import { useState } from "react";
import Image from "next/image";

const PLACEHOLDER =
  "/placeholder.svg";

/**
 * Shared big-image + scrollable-thumbnail-strip gallery, used by every
 * product/breed detail page so they all behave identically. The thumbnail
 * column is capped at 640px and scrolls on its own past ~7 photos — without
 * the cap it just grows unbounded when a listing has many images.
 */
export default function Gallery({
  images,
  alt,
  aspectClass = "aspect-3/4",
}: {
  images: string[];
  alt: string;
  aspectClass?: string;
}) {
  const list = images.length > 0 ? images : [PLACEHOLDER];
  const [active, setActive] = useState(0);

  return (
    <div className="flex min-w-0 flex-col gap-3 md:gap-4 lg:flex-row">
      {list.length > 1 && (
        <div className="order-2 flex min-w-0 gap-2 overflow-x-auto pb-1 md:gap-3 lg:order-1 lg:w-[88px] lg:max-h-[640px] lg:flex-shrink-0 lg:flex-col lg:gap-2 lg:overflow-x-hidden lg:overflow-y-auto">
          {list.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`aspect-square w-16 flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300 lg:w-full ${
                active === i ? "opacity-100 ring-2 ring-brand-gold" : "opacity-55 hover:opacity-90"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      <div className="order-1 overflow-hidden rounded-2xl bg-brand-pink/5 lg:order-2 lg:min-w-0 lg:flex-1">
        <div className={`relative ${aspectClass} w-full`}>
          <Image
            src={list[active]}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 720px"
            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
        </div>
      </div>
    </div>
  );
}
