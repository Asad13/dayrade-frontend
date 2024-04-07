import { useEffect, useState } from 'react';

export const useDebounceValue = (value: any, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useDebounce = <T extends any[]>(
  func: (...args: T) => void,
  delay = 500,
): ((...args: T) => void) => {
  let timer: NodeJS.Timeout;

  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
