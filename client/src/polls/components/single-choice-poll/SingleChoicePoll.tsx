import { FC } from "react";
import "./SingleChoicePoll.scss";
import { PollMessage } from "../../../messages/models/message.model";
import { useGetVotePercentage } from "../../hooks/use-get-vote-percentages";
import { useHandleVote } from "../../hooks/use-handle-vote";
import { Poll } from "../../models/poll.model";
import PollOptionCheckbox from "../poll-option-checkbox/PollOptionCheckbox";
import PollOptionPercentageBar from "../poll-option-percentage-bar/PollOptionPercentageBar";
import ViewResultsButton from "../view-results-button/ViewResultsButton";
import PollOptionPercentage from "../poll-option-percentage/PollOptionPercentage";
import VoteCountMessage from "../vote-count-message/VoteCountMessage";

interface Props {
  poll: Poll;
  message: PollMessage;
  isOwnPoll: boolean;
}

const SingleChoicePoll: FC<Props> = ({ poll, message, isOwnPoll }) => {
  const handleVote = useHandleVote(message, poll);

  const getVotesPercentage = useGetVotePercentage(poll);

  const userHasVoted = !!poll.userSelectedOptionIds.length;

  return (
    <div className="poll_body">
      <div className="poll_answer_options_list">
        {poll.answerOptions.map((option) => (
          <div className="poll_answer_option" key={option.id}>
            <div className="poll_answer_option_checkbox_container">
              {!userHasVoted ? (
                <PollOptionCheckbox
                  userHasVoted={userHasVoted}
                  onChange={(e) => {
                    if (e.target.checked) {
                      void handleVote([option.id]);
                    }
                  }}
                />
              ) : (
                <PollOptionPercentage
                  isOwnPoll={isOwnPoll}
                  poll={poll}
                  option={option}
                  percentage={getVotesPercentage(option.id)}
                />
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

      <div className="poll_button_container">
        {!userHasVoted || poll.isAnonymous ? (
          <VoteCountMessage isOwnPoll={isOwnPoll} votesCount={0} />
        ) : (
          <ViewResultsButton
            message={message}
            isOwnPoll={isOwnPoll}
            poll={poll}
          />
        )}
      </div>
    </div>
  );
};

export default SingleChoicePoll;
