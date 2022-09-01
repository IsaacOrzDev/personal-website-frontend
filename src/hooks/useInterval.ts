import { useEffect, useRef } from 'react';

export default function useInterval(
  callback: () => void,
  delay: number | null
) {
  const savedCallback = useRef(callback);
  const interval = useRef<any | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null && interval.current === null) {
      interval.current = setInterval(tick, delay);
      return () => {
        clearInterval(interval.current);
        interval.current = null;
      };
    }
  }, [delay]);
}
