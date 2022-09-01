import { useState, useEffect, useCallback } from 'react';

export default function useVisibles(
  durations: number[],
  visible?: boolean
): Record<string, any> {
  const [visibles, setVisilbles] = useState<Record<string, any>>(
    Object.assign(
      {},
      durations.map(() => false)
    )
  );

  const _runAnimations = useCallback((items: number[], v?: boolean) => {
    items.map((d, i) =>
      setTimeout(
        () =>
          setVisilbles(old => ({
            ...old,
            ...{ [i]: v },
          })),
        d
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (visible) {
      _runAnimations(durations, visible);
    } else {
      _runAnimations(
        durations.map(() => 0),
        visible
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return visibles;
}
