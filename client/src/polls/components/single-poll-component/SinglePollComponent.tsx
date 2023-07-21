import { FC } from "react";
import "./SinglePollComponent.scss";
import { Poll } from "../../models/poll.model";
import { pollsApiService } from "../polls-api.service";
import { useAppDispatch } from "../../../redux/store";
import { MessageActions } from "../../../messages/messages.reducer";
import { PollMessage } from "../../../messages/models/message.model";
import _ from "lodash";
import PollOptionPercentageBar from "../poll-option-percentage-bar/PollOptionPercentageBar";

interface Props {
  poll: Poll;
  message: PollMessage;
  isOwnPoll: boolean;
}

const SinglePollComponent: FC<Props> = ({ poll, message, isOwnPoll }) => {
  const dispatch = useAppDispatch();

  const handleVote = async (selectedOptionId: string) => {
    const result = await pollsApiService.vote(poll.id, {
      chosenAnswerOptions: [selectedOptionId],
    });

    dispatch(
      MessageActions.addPollVote({
        messageId: message.id,
        selectedOptionIds: [selectedOptionId],
      })
    );

    dispatch(
      MessageActions.setPollVotePercentages({
        messageId: message.id,
        votePercentages: result,
      })
    );
  };

  const votePercentagesById = _.groupBy(
    poll.votesPercentages,
    "answerOptionId"
  );

  const getVotesPercentage = (optionId: string): number => {
    const record = votePercentagesById[optionId];

    return record ? record[0].votesPercentage : 0;
  };

  const userHasVoted = !!poll.userSelectedOptionIds.length;

  return (
    <div className="poll_answer_options_list">
      {poll.answerOptions.map((option) => (
        <div className="poll_answer_option" key={option.id}>
          <div className="poll_answer_option_checkbox_container">
            {!userHasVoted ? (
              <input
                className="poll_answer_option_checkbox"
                type="checkbox"
                checked={poll.userSelectedOptionIds.includes(option.id)}
                disabled={userHasVoted}
                onChange={(e) => {
                  if (e.target.checked) {
                    void handleVote(option.id);
                  }
                }}
              />
            ) : (
              <div className="poll_answer_option_checkbox_percentage">
                {getVotesPercentage(option.id)}%
              </div>
            )}
          </div>

          <div className="poll_answer_option_text_container">
            <div className="poll_answer_option_text">{option.text}</div>

            <PollOptionPercentageBar
              userHasVoted={userHasVoted}
              isOwnPoll={isOwnPoll}
              votesPercentage={getVotesPercentage(option.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SinglePollComponent;
