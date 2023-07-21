import { FC } from "react";
import "./PollOptionPercentageBar.scss";
import { classIf } from "../../../utils/class-if";

interface Props {
  isOwnPoll: boolean;
  votesPercentage: number;
  userHasVoted: boolean;
}

const PollOptionPercentageBar: FC<Props> = ({
  isOwnPoll,
  votesPercentage,
  userHasVoted,
}) => {
  const width: number = !userHasVoted ? 0 : votesPercentage + 1;

  return (
    <div className="poll_answer_percentage_bar">
      <div
        className={
          "poll_answer_percentage_bar_value" + classIf(isOwnPoll, "own_poll")
        }
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default PollOptionPercentageBar;
