import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { selectCurrentChat } from "../../../current-chat/reducers/current-chat.reducer";
import { MessageActions } from "../../../messages/state/messages.reducer";
import { useAppDispatch } from "../../../redux/store";
import { useSocketEvent } from "../../use-socket-event";
import {
  RetractVoteSocketPayload,
  VotesSocketEvents,
} from "../../dtos/votes-socket-events";

export const useRetractVoteEvent = (socket: Socket | null) => {
  const dispatch = useAppDispatch();
  const { currentChatId } = useSelector(selectCurrentChat);

  const onRetractVote = useCallback(
    (eventPayload: RetractVoteSocketPayload) => {
      if (currentChatId !== eventPayload.chatId) {
        return;
      }

      dispatch(
        MessageActions.setPollVotePercentages({
          messageId: eventPayload.messageId,
          votePercentages: eventPayload.votePercentages,
          votesCount: eventPayload.totalVotesCount,
        })
      );
    },
    [currentChatId, dispatch]
  );

  useSocketEvent(socket, VotesSocketEvents.RETRACT, onRetractVote);
};
