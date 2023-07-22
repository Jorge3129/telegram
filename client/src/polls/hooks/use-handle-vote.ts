import { MessageActions } from "../../messages/messages.reducer";
import { Message } from "../../messages/models/message.model";
import { useAppDispatch } from "../../redux/store";
import { Poll } from "../models/poll.model";
import { pollsApiService } from "../polls-api.service";

export const useHandleVote = (message: Message, poll: Poll) => {
  const dispatch = useAppDispatch();

  const handleVote = async (selectedOptionIds: string[]) => {
    const result = await pollsApiService.vote(poll.id, {
      chosenAnswerOptions: selectedOptionIds,
    });

    dispatch(
      MessageActions.addPollVote({
        messageId: message.id,
        selectedOptionIds,
      })
    );

    dispatch(
      MessageActions.setPollVotePercentages({
        messageId: message.id,
        votePercentages: result,
      })
    );
  };

  return handleVote;
};
