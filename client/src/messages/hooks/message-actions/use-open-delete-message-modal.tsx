import { useCallback } from "react";
import { useModalContext } from "../../../shared/components/global-modal/context/global-modal.context";
import DeleteMessageModal, {
  DeleteMessageModalProps,
} from "../../components/modals/delete-message-modal/DeleteMessageModal";
import { Message } from "../../models/message.model";

export const useOpenDeleteMessageModal = (message: Message) => {
  const { closeModal, openModal } = useModalContext<DeleteMessageModalProps>();

  const renderDialog = (props: DeleteMessageModalProps) => (
    <DeleteMessageModal message={props.message} onClose={props.onClose} />
  );

  const onClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleOpenDeleteModal = useCallback(() => {
    openModal(renderDialog, { message, onClose });
  }, [openModal, message, onClose]);

  return handleOpenDeleteModal;
};
