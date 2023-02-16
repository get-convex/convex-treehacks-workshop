import { useState, useCallback } from "react";

export default function useSessionStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === undefined) return initialValue;
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = useCallback((value: T | ((value: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    if (typeof window !== undefined) {
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    }
  }, []);

  return [storedValue, setValue] as const;
}
