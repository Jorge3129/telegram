import { FC } from "react";
import "./SinglePollComponent.scss";
import { Poll } from "../../models/poll.model";
import { pollsApiService } from "../polls-api.service";
import { useAppDispatch } from "../../../redux/store";
import { MessageActions } from "../../../messages/messages.reducer";
import { PollMessage } from "../../../messages/models/message.model";

interface Props {
  poll: Poll;
  message: PollMessage;
}

const SinglePollComponent: FC<Props> = ({ poll, message }) => {
  const dispatch = useAppDispatch();

  const handleVote = async (selectedOptionId: string) => {
    dispatch(
      MessageActions.addPollVote({
        messageId: message.id,
        selectedOptionIds: [selectedOptionId],
      })
    );

    await pollsApiService.vote(poll.id, {
      chosenAnswerOptions: [selectedOptionId],
    });
  };

  return (
    <div className="poll_answer_options_list">
      {poll.answerOptions.map((option) => (
        <div className="poll_answer_option" key={option.id}>
          <input
            className="poll_answer_option_checkbox"
            type="checkbox"
            checked={poll.userSelectedOptionIds.includes(option.id)}
            disabled={!!poll.userSelectedOptionIds.length}
            onChange={(e) => {
              if (e.target.checked) {
                void handleVote(option.id);
              }
            }}
          />
          <div className="poll_answer_option_text">{option.text}</div>
        </div>
      ))}
    </div>
  );
};

export default SinglePollComponent;
