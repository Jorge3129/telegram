import { PollMessage } from "../../../messages/models/message.model";
import { MessageActions } from "../../../messages/state/messages.reducer";
import { useAppDispatch } from "../../../redux/store";
import { Poll } from "../../models/poll.model";
import { pollsApiService } from "../../polls-api.service";

export const useRetractVote = (poll: Poll, message: PollMessage) => {
  const dispatch = useAppDispatch();

  const handleRetractVote = async () => {
    await pollsApiService.retractVote(poll.id);

    dispatch(MessageActions.retractPollVote({ messageId: message.id }));
  };

  return handleRetractVote;
};
