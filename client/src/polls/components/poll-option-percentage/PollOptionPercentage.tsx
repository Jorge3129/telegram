import { FC } from "react";
import "./PollOptionPercentage.scss";
import { Poll, PollAnswerOption } from "../../models/poll.model";
import { classIf } from "../../../utils/class-if";

interface Props {
  percentage: number;
  poll: Poll;
  option: PollAnswerOption;
  isOwnPoll: boolean;
}

export const CheckCircleIcon = (props: { className: string }) => {
  return <i className={"fa-solid fa-circle-check " + props.className} />;
};

const PollOptionPercentage: FC<Props> = ({
  percentage,
  poll,
  option,
  isOwnPoll,
}) => {
  const isSelectedByUser = poll.userSelectedOptionIds.includes(option.id);

  return (
    <div
      className={
        "poll_answer_option_percentage" + classIf(isOwnPoll, "own_poll")
      }
    >
      <div className="poll_answer_option_percentage_value">{percentage}%</div>

      {isSelectedByUser && (
        <CheckCircleIcon className="poll_answer_option_percentage_check" />
      )}
    </div>
  );
};

export default PollOptionPercentage;
