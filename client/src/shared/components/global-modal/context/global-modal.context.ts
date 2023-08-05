import { Context, createContext, useContext } from "react";

interface GlobalModalContextData<T> {
  openModal: (
    render: (props: T) => JSX.Element,
    props: T,
    className?: string
  ) => void;
  closeModal: () => void;
  setProps: (props: T) => void;
}

export const GlobalModalContext = createContext<
  GlobalModalContextData<unknown>
>({
  closeModal: () => void 0,
  openModal: () => void 0,
  setProps: () => void 0,
});

export const useModalContext = <T>() =>
  useContext<GlobalModalContextData<T>>(
    GlobalModalContext as unknown as Context<GlobalModalContextData<T>>
  );
