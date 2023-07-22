import { useEffect } from "react";
import { MessageActions } from "../../messages/messages.reducer";
import { PollMessage } from "../../messages/models/message.model";
import { useAppDispatch } from "../../redux/store";
import { Poll } from "../models/poll.model";
import { pollsApiService } from "../polls-api.service";

export const useFetchPollResults = (poll: Poll, message: PollMessage) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void pollsApiService.getPollResults(poll.id).then((results) => {
      dispatch(
        MessageActions.setPollVoteResults({
          results,
          messageId: message.id,
        })
      );
    });
  }, [dispatch, poll, message.id]);
};
