import { useEffect } from "react";
import { Observable } from "rxjs";

export const useSubscribeObservable = <T>(
  source$: Observable<T>,
  callback: (value: T) => void
) => {
  useEffect(() => {
    const sub = source$.subscribe((value) => {
      callback(value);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [source$, callback]);
};
