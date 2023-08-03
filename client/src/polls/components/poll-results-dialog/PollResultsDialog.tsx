import { FC } from "react";
import "./PollResultsDialog.scss";
import { Poll } from "../../models/poll.model";
import { PollMessage } from "../../../messages/models/message.model";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import PollResultsDialogBody from "./poll-results-dialog-body/PollResultsDialogBody";

export interface PollResultsDialogProps {
  onClose: () => void;
  poll: Poll;
  message: PollMessage;
}

const PollResultsDialog: FC<PollResultsDialogProps> = ({ onClose, poll }) => {
  return (
    <div className="poll_results_dialog">
      <div className="poll_results_dialog_header">
        <div className="poll_results_dialog_title">
          <div className="title">Poll results</div>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>

        <div className="poll_results_dialog_question">{poll.question}</div>
      </div>

      <PollResultsDialogBody poll={poll} />
    </div>
  );
};

export default PollResultsDialog;
