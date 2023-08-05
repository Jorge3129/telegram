import { FC } from "react";
import "./CreatePollModal.scss";

export interface CreatePollModalProps {
  onClose: () => void;
}

const CreatePollModal: FC<CreatePollModalProps> = () => {
  return <>New poll</>;
};

export default CreatePollModal;
