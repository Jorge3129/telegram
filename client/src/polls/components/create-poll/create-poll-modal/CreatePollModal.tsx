import { FC } from "react";
import "./CreatePollModal.scss";
import CreatePollForm from "../create-poll-form/CreatePollForm";

export interface CreatePollModalProps {
  onClose: () => void;
}

const CreatePollModal: FC<CreatePollModalProps> = () => {
  return (
    <div className="create_poll_modal">
      <div className="create_poll_modal_header">
        <div className="create_poll_modal_title">
          <div className="title">New poll</div>
        </div>
      </div>

      <CreatePollForm />
    </div>
  );
};

export default CreatePollModal;
