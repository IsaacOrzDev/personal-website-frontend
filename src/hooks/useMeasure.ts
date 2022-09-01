import { useRef, useState, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import Bounds from 'models/Bounds';

export default function useMeasure(): [
  { ref: React.MutableRefObject<any> },
  Bounds | undefined
] {
  const ref = useRef<any>();
  const [bounds, set] = useState<Bounds | undefined>(undefined);
  const [ro] = useState(
    () =>
      new ResizeObserver(([entry]) => {
        const bounds = entry.target.getBoundingClientRect();
        if (bounds) {
          set(bounds);
          // set(entry.contentRect);
        } else {
          set(entry.contentRect);
        }
      })
  );
  useEffect(() => {
    if (ref.current) {
      ro.observe(ref.current);
    }
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);
  return [{ ref }, bounds];
}
