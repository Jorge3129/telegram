import { useMemo } from "react";
import { BehaviorSubject, debounceTime } from "rxjs";

export const useScrollSubject = <Event>(debounceMs = 300) => {
  const scrollSubject$ = useMemo(() => {
    return new BehaviorSubject<Event | null>(null);
  }, []);

  const scroll$ = useMemo(() => {
    return scrollSubject$.pipe(debounceTime(debounceMs));
  }, [scrollSubject$, debounceMs]);

  return {
    emitScrollEvent: (event: Event) => scrollSubject$.next(event),
    scroll$,
  };
};
