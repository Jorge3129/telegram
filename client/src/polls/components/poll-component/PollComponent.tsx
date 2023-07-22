import { FC } from "react";
import "./PollComponent.scss";
import { Poll } from "../../models/poll.model";
import { classIf } from "../../../utils/class-if";
import { PollMessage } from "../../../messages/models/message.model";
import SingleChoicePoll from "../single-choice-poll/SingleChoicePoll";
import { getPollType } from "../../utils/get-poll-type";
import MultipleChoicePoll from "../multiple-choice-poll/MultipleChoicePoll";

interface Props {
  poll: Poll;
  isOwnMessage: boolean;
  message: PollMessage;
}

const PollComponent: FC<Props> = ({ poll, isOwnMessage, message }) => {
  return (
    <div className={"poll_container" + classIf(isOwnMessage, "own_poll")}>
      <div className="poll_question">{poll.question}</div>
      <div className="poll_type">{getPollType(poll)}</div>

      {poll.isMultipleChoice ? (
        <MultipleChoicePoll
          poll={poll}
          message={message}
          isOwnPoll={isOwnMessage}
        />
      ) : (
        <SingleChoicePoll
          poll={poll}
          message={message}
          isOwnPoll={isOwnMessage}
        />
      )}
    </div>
  );
};

export default PollComponent;
