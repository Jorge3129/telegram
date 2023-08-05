import { FC, PropsWithChildren, useCallback, useState } from "react";
import "./GlobalModal.scss";
import { GlobalModalContext } from "./context/global-modal.context";
import { Dialog } from "@mui/material";

interface Props {}

interface ModalState {
  renderContent: ((props: unknown) => JSX.Element) | null;
}

const GlobalModal: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({
    renderContent: null,
  });
  const [modalProps, setModalProps] = useState<unknown | null>(null);
  const [modalClassName, setModalClassName] = useState<string>("");

  const openModal = useCallback(
    (
      renderContent: (props: unknown) => JSX.Element,
      props: unknown,
      className = ""
    ) => {
      setModalProps(props);
      setModalState({
        renderContent,
      });
      setModalClassName(className);
    },
    []
  );

  const closeModal = useCallback(
    () => setModalState({ renderContent: null }),
    []
  );

  const setProps = useCallback((props: unknown) => setModalProps(props), []);

  const renderContent = () => {
    if (!modalState.renderContent || !modalProps) {
      return;
    }

    return modalState.renderContent(modalProps);
  };

  return (
    <GlobalModalContext.Provider value={{ openModal, closeModal, setProps }}>
      {children}
      <Dialog
        className={modalClassName}
        keepMounted
        open={!!modalState.renderContent}
        onClose={closeModal}
      >
        {renderContent()}
      </Dialog>
    </GlobalModalContext.Provider>
  );
};

export default GlobalModal;
