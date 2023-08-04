import { FC } from "react";
import "./VoteCountMessage.scss";
import { classIf } from "../../../utils/class-if";
import { formatWithQuantity } from "../../../shared/utils/pluralize";
import { Poll } from "../../models/poll.model";

interface Props {
  isOwnPoll: boolean;
  poll: Poll;
}

const VoteCountMessage: FC<Props> = ({ isOwnPoll, poll }) => {
  return (
    <div className={"votes_count_message" + classIf(isOwnPoll, "own_poll")}>
      {poll.totalVotesCount
        ? formatWithQuantity(poll.totalVotesCount, "vote")
        : "No votes"}
    </div>
  );
};

export default VoteCountMessage;
