import { FC } from "react";
import "./PollOptionTextContainer.scss";
import { PollAnswerOption } from "../../models/poll.model";
import { classIf } from "../../../utils/class-if";

interface Props {
  option: PollAnswerOption;
  isOwnPoll: boolean;
  votesPercentage: number;
}

// TODO separate progress bar
const PollOptionTextContainer: FC<Props> = ({
  option,
  isOwnPoll,
  votesPercentage,
}) => {
  return (
    <div className="poll_answer_option_text_container">
      <div className="poll_answer_option_text">{option.text}</div>
      <div className="poll_answer_percentage_bar">
        <div
          className={
            "poll_answer_percentage_bar_value" + classIf(isOwnPoll, "own_poll")
          }
          style={{ width: `${votesPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PollOptionTextContainer;
