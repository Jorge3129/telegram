import { FC } from "react";
import "./VoteCountMessage.scss";
import { classIf } from "../../../utils/class-if";
import { formatWithQuantity } from "../../../shared/utils/pluralize";

interface Props {
  isOwnPoll: boolean;
  votesCount?: number;
}

const VoteCountMessage: FC<Props> = ({ isOwnPoll, votesCount }) => {
  return (
    <div className={"votes_count_message" + classIf(isOwnPoll, "own_poll")}>
      {votesCount ? formatWithQuantity(votesCount, "vote") : "No votes"}
    </div>
  );
};

export default VoteCountMessage;
