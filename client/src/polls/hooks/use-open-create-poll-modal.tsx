import { useCallback } from "react";
import { useModalContext } from "../../shared/components/global-modal/context/global-modal.context";
import CreatePollModal, {
  CreatePollModalProps,
} from "../components/create-poll/create-poll-modal/CreatePollModal";

export const useOpenCreatePollModal = () => {
  const { closeModal, openModal } = useModalContext<CreatePollModalProps>();

  const onClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const onOpen = useCallback(() => {
    openModal(
      (props) => <CreatePollModal {...props} />,
      { onClose },
      "create_poll_modal_wrapper"
    );
  }, [openModal, onClose]);

  return onOpen;
};
