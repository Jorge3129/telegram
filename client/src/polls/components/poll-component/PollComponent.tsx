import { FC } from "react";
import "./PollComponent.scss";
import { Poll } from "../../models/poll.model";
import { classIf } from "../../../utils/class-if";
import SinglePollComponent from "../single-poll-component/SinglePollComponent";
import { PollMessage } from "../../../messages/models/message.model";

interface Props {
  poll: Poll;
  isOwnMessage: boolean;
  message: PollMessage;
}

const getPollType = (poll: Poll): string => {
  if (poll.isAnonymous) {
    return "Anonymous Poll";
  }

  if (poll.isQuiz) {
    return "Quiz";
  }

  return "Poll";
};

const PollComponent: FC<Props> = ({ poll, isOwnMessage, message }) => {
  return (
    <div className={"poll_container" + classIf(isOwnMessage, "own_poll")}>
      <div className="poll_question">{poll.question}</div>
      <div className="poll_type">{getPollType(poll)}</div>

      <SinglePollComponent
        poll={poll}
        message={message}
        isOwnPoll={isOwnMessage}
      />
    </div>
  );
};

export default PollComponent;
