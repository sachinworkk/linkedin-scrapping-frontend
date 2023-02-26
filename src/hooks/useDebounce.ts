import { useState, useEffect } from "react";

function useDebounce(callback: Function, delay: number) {
  const [timer, setTimer] = useState<any>(null);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const debouncedCallback = (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => callback(...args), delay));
  };

  return debouncedCallback;
}

export default useDebounce;
