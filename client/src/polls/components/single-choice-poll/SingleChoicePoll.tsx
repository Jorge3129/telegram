import { FC } from "react";
import "./SingleChoicePoll.scss";
import { PollMessage } from "../../../messages/models/message.model";
import { useGetVotePercentage } from "../../hooks/use-get-vote-percentages";
import { useHandleVote } from "../../hooks/use-handle-vote";
import { Poll } from "../../models/poll.model";
import PollOptionCheckbox from "../poll-option-checkbox/PollOptionCheckbox";
import PollOptionPercentageBar from "../poll-option-percentage-bar/PollOptionPercentageBar";
import PollButton from "../poll-button/PollButton";
import NoVotesMessage from "./no-votes-message/NoVotesMessage";

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

      <div className="poll_button_container">
        {!userHasVoted ? (
          <NoVotesMessage isOwnPoll={isOwnPoll} />
        ) : (
          <PollButton isOwnPoll={isOwnPoll}>View results</PollButton>
        )}
      </div>
    </div>
  );
};

export default SingleChoicePoll;
