import { FC, useCallback, useEffect } from "react";
import "./ViewResultsButton.scss";
import { Poll } from "../../models/poll.model";
import PollButton from "../poll-button/PollButton";
import { PollMessage } from "../../../messages/models/message.model";
import PollResultsDialog, {
  PollResultsDialogProps,
} from "../poll-results-dialog/PollResultsDialog";
import { useModalContext } from "../../../shared/components/global-modal/context/global-modal.context";
import { useFetchPollResults } from "../../hooks/use-fetch-poll-results";

interface Props {
  poll: Poll;
  isOwnPoll: boolean;
  message: PollMessage;
}

const ViewResultsButton: FC<Props> = ({ poll, isOwnPoll, message }) => {
  const { closeModal, openModal, setProps } =
    useModalContext<PollResultsDialogProps>();

  const fetchPollResults = useFetchPollResults(poll, message);

  const renderDialog = (props: PollResultsDialogProps) => (
    <PollResultsDialog
      poll={props.poll}
      message={props.message}
      onClose={props.onClose}
    />
  );

  const onClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const onOpen = () => {
    fetchPollResults();
    openModal(renderDialog, { poll, message, onClose });
  };

  useEffect(() => {
    setProps({ poll, message, onClose });
  }, [poll, message, onClose, setProps]);

  return (
    <PollButton isOwnPoll={isOwnPoll} onClick={onOpen}>
      View results
    </PollButton>
  );
};

export default ViewResultsButton;
