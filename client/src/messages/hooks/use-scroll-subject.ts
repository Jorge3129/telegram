import { useCallback, useMemo } from "react";
import { BehaviorSubject } from "rxjs";

export const useScrollSubject = <Event>() => {
  const scrollSubject$ = useMemo(() => {
    return new BehaviorSubject<Event | null>(null);
  }, []);

  const scroll$ = useMemo(() => {
    return scrollSubject$.pipe();
  }, [scrollSubject$]);

  const emitScrollEvent = useCallback(
    (event: Event) => scrollSubject$.next(event),
    [scrollSubject$]
  );

  return {
    emitScrollEvent,
    scroll$,
  };
};
