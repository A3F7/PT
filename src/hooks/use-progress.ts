"use client";

import { useCallback, useEffect, useState } from "react";

export interface SolvedEntry {
  picked: number;
  correct: boolean;
}

export interface Progress {
  solved: Record<string, SolvedEntry>;
}

const KEY = "peachtree-master-progress-v1";

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({ solved: {} });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe localStorage rehydration
      if (raw) setProgress(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const record = useCallback((qid: string, picked: number, correct: boolean) => {
    setProgress((prev) => {
      if (prev.solved[qid]?.picked === picked) return prev;
      const next = { solved: { ...prev.solved, [qid]: { picked, correct } } };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setProgress({ solved: {} });
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const solvedCount = Object.keys(progress.solved).length;
  const correctCount = Object.values(progress.solved).filter((s) => s.correct).length;

  return { progress, ready, record, reset, solvedCount, correctCount };
}
