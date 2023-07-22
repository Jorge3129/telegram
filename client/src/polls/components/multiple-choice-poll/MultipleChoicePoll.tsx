import { FC, useEffect, useState } from "react";
import "./MultipleChoicePoll.scss";
import { PollMessage } from "../../../messages/models/message.model";
import { Poll } from "../../models/poll.model";
import { useGetVotePercentage } from "../../hooks/use-get-vote-percentages";
import { useHandleVote } from "../../hooks/use-handle-vote";
import PollOptionCheckbox from "../poll-option-checkbox/PollOptionCheckbox";
import PollOptionPercentageBar from "../poll-option-percentage-bar/PollOptionPercentageBar";
import PollButton from "../poll-button/PollButton";
import ViewResultsButton from "../view-results-button/ViewResultsButton";

interface Props {
  poll: Poll;
  message: PollMessage;
  isOwnPoll: boolean;
}

const MultipleChoicePoll: FC<Props> = ({ poll, message, isOwnPoll }) => {
  const handleVote = useHandleVote(message, poll);

  const getVotesPercentage = useGetVotePercentage(poll);

  const userHasVoted = !!poll.userSelectedOptionIds.length;

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (selectedOptionId: string, checked: boolean) => {
    if (checked) {
      return setSelectedOptions((prevOptions) => [
        ...prevOptions,
        selectedOptionId,
      ]);
    }

    setSelectedOptions((prevOptions) =>
      prevOptions.filter((option) => option !== selectedOptionId)
    );
  };

  useEffect(() => {
    if (!userHasVoted) {
      setSelectedOptions([]);
    }
  }, [userHasVoted]);

  return (
    <div className="poll_body">
      <div className="poll_answer_options_list">
        {poll.answerOptions.map((option) => (
          <div className="poll_answer_option" key={option.id}>
            <div className="poll_answer_option_checkbox_container">
              {!userHasVoted ? (
                <PollOptionCheckbox
                  userHasVoted={userHasVoted}
                  checked={selectedOptions.includes(option.id)}
                  onChange={(e) => {
                    handleOptionSelect(option.id, e.target.checked);
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
          <PollButton
            isOwnPoll={isOwnPoll}
            disabled={!selectedOptions.length}
            onClick={() => {
              void handleVote(selectedOptions);
            }}
          >
            Vote
          </PollButton>
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

export default MultipleChoicePoll;
