import { FC, useState } from "react";
import "./ViewResultsButton.scss";
import { Poll } from "../../models/poll.model";
import PollButton from "../poll-button/PollButton";
import { PollMessage } from "../../../messages/models/message.model";
import PollResultsDialog from "../poll-results-dialog/PollResultsDialog";

interface Props {
  poll: Poll;
  isOwnPoll: boolean;
  message: PollMessage;
}

const ViewResultsButton: FC<Props> = ({ poll, isOwnPoll, message }) => {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  return (
    <>
      <PollButton isOwnPoll={isOwnPoll} onClick={() => setOpen(true)}>
        View results
      </PollButton>

      <PollResultsDialog
        open={open}
        poll={poll}
        message={message}
        onClose={onClose}
      />
    </>
  );
};

export default ViewResultsButton;
