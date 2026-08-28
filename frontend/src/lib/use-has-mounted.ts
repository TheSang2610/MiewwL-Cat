"use client";

import { useEffect, useState } from "react";

/**
 * True only after the client has hydrated. Guards any render output that
 * depends on persisted (localStorage) store state — SSR always sees the
 * store's empty default, so reading persisted state during the first client
 * render too would mismatch the server-rendered HTML.
 */
export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  // This *is* the hydration-complete signal — there's no external system to
  // subscribe to instead, so the lint rule's usual alternative doesn't apply.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  return mounted;
}
