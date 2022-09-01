import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';
import breakpoints from 'config/breakpoints';
import BreakpointService from 'services/breakpointService';

const getDeviceConfig = (width: number, height: number) => {
  let breakpoint = '';
  if (width < 576) {
    breakpoint = breakpoints.xs;
  } else if (width >= 576 && width < 768) {
    breakpoint = breakpoints.sm;
  } else if (width >= 768 && width < 992) {
    breakpoint = breakpoints.md;
  } else if (width >= 992 && width < 1200) {
    breakpoint = breakpoints.lg;
  } else if (width >= 1200) {
    breakpoint = breakpoints.xl;
  }

  if (height < 930 && breakpoint === breakpoints.xl) {
    breakpoint = breakpoints.lg;
  }

  return breakpoint;
};

const useResize = (): [string | undefined, boolean] => {
  const [brkPnt, setBrkPnt] = useState(() =>
    getDeviceConfig(window.innerWidth, window.innerHeight)
  );
  const [isResponsive, setIsResponsive] = useState(() =>
    BreakpointService.isEqualOrDown(brkPnt!, breakpoints.sm)
  );

  useEffect(() => {
    const calcInnerWidth = throttle(function() {
      const breakpoint = getDeviceConfig(window.innerWidth, window.innerHeight);
      setBrkPnt(breakpoint);
      setIsResponsive(
        BreakpointService.isEqualOrDown(breakpoint!, breakpoints.sm)
      );
    }, 200);
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return [brkPnt, isResponsive];
};

export default useResize;
