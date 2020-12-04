import { useState, useMemo } from "react";
import { initialState } from "../contexts/index";

export default function useProgress() {
  const [progress, setProgress] = useState(initialState.progress);

  const handleProgress = useMemo(
    () => ({
      start: () => setProgress({ isLoading: true, error: false }),
      end: () => setProgress({ isLoading: false, error: false }),
      error: () => setProgress({ isLoading: false, error: true })
    }),
    []
  );

  return { progress, handleProgress };
}
