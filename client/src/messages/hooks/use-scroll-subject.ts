import { useCallback, useMemo } from "react";
import { BehaviorSubject, debounceTime } from "rxjs";

export const useScrollSubject = <Event>(debounceMs = 0) => {
  const scrollSubject$ = useMemo(() => {
    return new BehaviorSubject<Event | null>(null);
  }, []);

  const scroll$ = useMemo(() => {
    if (!debounceMs) {
      return scrollSubject$;
    }

    return scrollSubject$.pipe(debounceTime(debounceMs));
  }, [scrollSubject$, debounceMs]);

  const emitScrollEvent = useCallback(
    (event: Event) => scrollSubject$.next(event),
    [scrollSubject$]
  );

  return {
    emitScrollEvent,
    scroll$,
  };
};
