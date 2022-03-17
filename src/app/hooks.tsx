import React, { EffectCallback, useEffect, useRef } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Áp dụng`useDispatch` and `useSelector` cho toàn bộ ứng dụng
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Hàm trả ra giá trị sau 1 thời gian delay
 * @param value Giá trị truyền vào.
 * @param delay Thời gian delay
 * @returns Giá trị truyền vào sau 1 thời gian delay
 */
export const useDebounce = <T extends unknown>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

/**
 * Delay gọi hàm sau 1 khoảng thời gian
 * @param callback : Hàm xử lý sau khoảng thời gian delay
 * @param delay: thời gian delay theo second
 */
export const useInterval = (callback: () => void, delay: number | undefined): void => {
  const savedCallback = useRef<() => void>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay) {
      const id = setInterval(tick, delay * 1000);
      return () => clearInterval(id);
    }
  }, [delay]);
};

/**
 * Hook này chỉ call useEffect 1 lần duy nhất
 * @param effect
 */
export const useEffectOnce = (effect: EffectCallback): void => {
  useEffect(effect, []);
};

export default useEffectOnce;
