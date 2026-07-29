import { useCallback, useState } from "react";

const STORAGE_KEY = "searchHistory";
const MAX_ITEMS = 5;

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(history: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export default function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(load);

  const addHistory = useCallback((q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setHistory((prev) => {
      const next = [trimmed, ...prev.filter((h) => h !== trimmed)].slice(0, MAX_ITEMS);
      save(next);
      return next;
    });
  }, []);

  const removeHistory = useCallback((q: string) => {
    setHistory((prev) => {
      const next = prev.filter((h) => h !== q);
      save(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { history, addHistory, removeHistory, clearHistory };
}
