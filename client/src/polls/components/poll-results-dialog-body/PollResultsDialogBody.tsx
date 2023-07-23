import { FC } from "react";
import "./PollResultsDialogBody.scss";
import { Poll } from "../../models/poll.model";
import { Avatar } from "@mui/material";
import { initials } from "../../../shared/utils/format-initials";
import { useGetVotePercentage } from "../../hooks/use-get-vote-percentages";
import { formatWithQuantity } from "../../../shared/utils/pluralize";
import { useGetVotes } from "../../hooks/use-get-votes";

interface Props {
  poll: Poll;
}

const PollResultsDialogBody: FC<Props> = ({ poll }) => {
  const getPercentage = useGetVotePercentage(poll);
  const getVotes = useGetVotes(poll);

  const answerOptions = poll.answerOptions.filter(
    (option) => !!getPercentage(option.id)
  );

  return (
    <div className="poll_results_list">
      {answerOptions.map((option) => {
        const votes = getVotes(option.id);

        const votesCount = votes.length;

        return (
          <div className="poll_result_option" key={option.id}>
            <div className="poll_result_option_header">
              <div className="answer_text">
                {option.text} - {getPercentage(option.id)}%
              </div>
              <div className="votes_count">
                <span>{formatWithQuantity(votesCount, "vote")}</span>
              </div>
            </div>

            <div className="poll_result_option_votes">
              {getVotes(option.id).map((userVote) => (
                <div
                  className="poll_result_option_vote"
                  key={`${option.id}-${userVote.id}`}
                >
                  <Avatar>{initials(userVote.username)}</Avatar>

                  <div className="username">{userVote.username}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PollResultsDialogBody;
