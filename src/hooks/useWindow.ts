import { useEffect, useState, useRef } from 'react';
import throttle from 'lodash.throttle';

const isBrowser = typeof window !== 'undefined';

export default function useWindow(): [
  { yTop: number; yBottom: number },
  { yTop: number; yBottom: number },
  number
] {
  let yTop = isBrowser ? window.pageYOffset : 0;
  let yBottom = isBrowser ? window.pageYOffset + window.innerHeight : 0;
  const [windowOffset, setWindowOffset] = useState({
    yTop,
    yBottom,
  });
  const [currentWindowOffset, setCurrentWindowOffset] = useState({
    yTop,
    yBottom,
  });
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const timer = useRef<any>(null);

  function _checkOffset() {
    if (isBrowser) {
      yTop = window.pageYOffset;
      yBottom = window.pageYOffset + window.innerHeight;
      setWindowOffset({ yTop, yBottom });
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(
        () => setCurrentWindowOffset({ yTop, yBottom }),
        300
      );
    }
  }

  useEffect(() => {
    const _checkOffsetWithThrottle = throttle(function() {
      _checkOffset();
    }, 200);

    const _checkOffsetAndHeightWithThrottle = throttle(function() {
      _checkOffset();
      setWindowHeight(window.innerHeight);
    }, 200);

    window.addEventListener('scroll', _checkOffsetWithThrottle);
    window.addEventListener('resize', _checkOffsetAndHeightWithThrottle);
    // _checkOffset();

    return () => {
      window.removeEventListener('scroll', _checkOffsetWithThrottle);
      window.removeEventListener('resize', _checkOffsetAndHeightWithThrottle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [windowOffset, currentWindowOffset, windowHeight];
}
