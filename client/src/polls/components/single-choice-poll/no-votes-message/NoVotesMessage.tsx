import { FC } from "react";
import "./NoVotesMessage.scss";
import { classIf } from "../../../../utils/class-if";

interface Props {
  isOwnPoll: boolean;
}

const NoVotesMessage: FC<Props> = ({ isOwnPoll }) => {
  return (
    <div className={"no_votes_message" + classIf(isOwnPoll, "own_poll")}>
      No votes
    </div>
  );
};

export default NoVotesMessage;
