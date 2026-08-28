"use client";

import { useCallback, useEffect, useState } from "react";
import { errorMessage } from "./api";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

/**
 * Runs an async fetch on mount and whenever `deps` change.
 *
 * The first state update happens after the first `await`, never synchronously
 * inside the effect body — that avoids the cascading re-render React warns
 * about. Results from a superseded run are discarded, so switching ids
 * quickly can't leave stale data on screen.
 */
export function useAsync<T>(
  fetcher: () => Promise<T>,
  deps: readonly unknown[]
): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const result = await fetcher();
        if (cancelled) return;
        setData(result);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setData(null);
        setError(errorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // `fetcher` is intentionally excluded: callers pass an inline closure, and
    // `deps` is the explicit list of what it actually depends on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  return { data, loading, error, reload };
}
