import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

export const useTimeout = (callback, timeout) => {
  const timeoutIdRef = useRef();

  const cancel = useCallback(() => {
    const timeoutId = timeoutIdRef.current;
    if (timeoutId) {
      timeoutIdRef.current = undefined;
      clearTimeout(timeoutId);
    }
  }, [timeoutIdRef]);

  useEffect(() => {
    timeoutIdRef.current = setTimeout(callback, timeout);
    return cancel;
  }, [callback, timeout, cancel]);

  return cancel;
};