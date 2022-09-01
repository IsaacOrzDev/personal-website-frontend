import { useEffect } from 'react';
import { useScrollDirection } from './useScrollDirection';
import { useDispatch } from 'react-redux';
import { globalActions } from 'store/global';

export default function useScrollEffect(
  shouldListen: boolean,
  scrollDownEvent: () => void,
  scrollUpEvent: () => void
) {
  const direction = useScrollDirection();
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldListen) {
      if (direction > 0) {
        // Down
        // console.log('down');
        dispatch(globalActions.stopScrollingDuringAnimation());

        scrollDownEvent();
      } else if (direction < 0) {
        // Up
        // console.log('up');
        dispatch(globalActions.stopScrollingDuringAnimation());
        scrollUpEvent();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);
}
