import { FC } from "react";
import "./DeleteMessageModal.scss";
import { Message } from "../../../models/message.model";
import { Button } from "@mui/material";
import { useDeleteMessage } from "../../../hooks/message-actions/use-delete-message";

export interface DeleteMessageModalProps {
  onClose: () => void;
  message: Message;
}

const DeleteMessageModal: FC<DeleteMessageModalProps> = ({
  onClose,
  message,
}) => {
  const handleDelete = useDeleteMessage(message);

  const onDelete = () => {
    onClose();
    void handleDelete();
  };

  return (
    <div className="delete_message_modal">
      <div className="delete_message_modal_body">
        Do you want to delete this message?
      </div>

      <div className="delete_message_modal_buttons">
        <Button className="delete_message_modal_button" onClick={onClose}>
          Cancel
        </Button>

        <Button className="delete_message_modal_button" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteMessageModal;
