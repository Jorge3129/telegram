import { FC, useEffect } from "react";
import "./PollResultsDialogBody.scss";
import { Poll } from "../../models/poll.model";
import _ from "lodash";
import { Avatar } from "@mui/material";
import { initials } from "../../../shared/utils/format-initials";
import { useAppDispatch } from "../../../redux/store";
import { MessageActions } from "../../../messages/messages.reducer";
import { pollsApiService } from "../../polls-api.service";
import { useGetVotePercentage } from "../../hooks/use-get-vote-percentages";

interface Props {
  poll: Poll;
  pollMessageId: string;
}

const PollResultsDialogBody: FC<Props> = ({ poll, pollMessageId }) => {
  const groupedVotes = _.groupBy(poll.answerOptionsWithUsers, "optionId");

  const dispatch = useAppDispatch();

  useEffect(() => {
    void pollsApiService.getPollResults(poll.id).then((results) => {
      dispatch(
        MessageActions.setPollVoteResults({
          results,
          messageId: pollMessageId,
        })
      );
    });
  }, [dispatch, poll, pollMessageId]);

  const getPercentage = useGetVotePercentage(poll);

  const getVotes = (optionId: string) => {
    return groupedVotes[optionId]?.at(0)?.votedUsers || [];
  };

  const answerOptions = poll.answerOptions.filter(
    (option) => !!getPercentage(option.id)
  );

  return (
    <div className="poll_results_list">
      {answerOptions.map((option) => (
        <div className="poll_result_option" key={option.id}>
          <div className="poll_result_option_header">
            <div className="answer_text">
              {option.text} - {getPercentage(option.id)}%
            </div>
            <div className="votes_count">
              {getVotes(option.id).length} votes
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
      ))}
    </div>
  );
};

export default PollResultsDialogBody;
