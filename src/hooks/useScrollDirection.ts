import { useEffect, useState, useRef } from 'react';
import throttle from 'lodash.throttle';

// left: 37, up: 38, pageup: 33, home: 36
// right: 39, down: 40, spacebar: 32, pagedown: 34, end: 35
const upKeys = [37, 38, 33, 36];
const downKeys = [39, 40, 32, 34, 35];

function isScrollDirectionUp(event: any) {
  if (event.wheelDelta) {
    return event.wheelDelta > 0;
  } else {
    return event.deltaY < 0;
  }
}

function preventDefault(e: any) {
  e = e || window.event;
  if (e.preventDefault) e.preventDefault();
  e.returnValue = false;
}

export const useScrollDirection = () => {
  const [direction, setDirection] = useState(0);
  const directionRef = useRef(direction);
  directionRef.current = direction;

  function checkScrollDirection(event: any) {
    // console.log(isScrollDirectionUp(event));
    if (isScrollDirectionUp(event)) {
      if (directionRef.current < 0) {
        setDirection(directionRef.current - 1);
      } else {
        setDirection(-1);
      }
    } else {
      if (directionRef.current > 0) {
        setDirection(directionRef.current + 1);
      } else {
        setDirection(1);
      }
    }
    // preventDefault(event);
    return false;
  }

  function checkKeyDown(event: any) {
    if (upKeys.find(x => x === event.keyCode)) {
      if (directionRef.current < 0) {
        setDirection(directionRef.current - 1);
      } else {
        setDirection(-1);
      }
      preventDefault(event);
      return false;
    } else if (downKeys.find(x => x === event.keyCode)) {
      if (directionRef.current > 0) {
        setDirection(directionRef.current + 1);
      } else {
        setDirection(1);
      }
      preventDefault(event);
      return false;
    }
  }

  useEffect(() => {
    const checkScrollDirectionWithThrottle = throttle(function(e) {
      checkScrollDirection(e);
    }, 1000);

    const checkKeyDownWithThrottle = throttle(function(e) {
      checkKeyDown(e);
    }, 1000);

    window.addEventListener('wheel', checkScrollDirectionWithThrottle, {
      passive: false,
    });
    window.addEventListener('keydown', checkKeyDownWithThrottle);

    return () => {
      window.removeEventListener(
        'wheel',
        checkScrollDirectionWithThrottle,
        false
      );
      window.removeEventListener('keydown', checkKeyDownWithThrottle);
    };
  }, []);

  return direction;
};
