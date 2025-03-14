"use client";
import { useEffect, useRef } from "react";

const useDebounce = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = <T extends unknown[]>(...args: T): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      //@ts-expect-error: We know that the callback will be called with the same arguments
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

export default useDebounce;
