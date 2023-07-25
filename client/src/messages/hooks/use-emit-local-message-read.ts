import { useSelector } from "react-redux";
import { ChatActions } from "../../chats/chats.reducer";
import { selectCurrentChat } from "../../current-chat/reducers/current-chat.reducer";
import { useAppDispatch } from "../../redux/store";
import { isMessageSeen } from "../../utils/is-message-seen";
import { Message } from "../models/message.model";
import { MessageActions, selectMessages } from "../state/messages.reducer";
import { useCallback } from "react";

export const useEmitLocalMessageRead = () => {
  const { currentChat } = useSelector(selectCurrentChat);
  const { messages } = useSelector(selectMessages);
  const dispatch = useAppDispatch();

  const emitReadEvent = useCallback(
    (message: Message): void => {
      if (
        !currentChat ||
        message.isReadByCurrentUser ||
        message.isCurrentUserAuthor ||
        isMessageSeen(message.timestamp, currentChat.unread, messages)
      ) {
        return;
      }

      dispatch(
        MessageActions.updateReadsByCurrentUser({
          message,
        })
      );

      const index = messages.findIndex((m) => m.id === message.id);

      dispatch(
        ChatActions.setUnread({
          unread: messages.slice(index + 1).length,
          chatId: currentChat.id,
        })
      );
    },
    [currentChat, dispatch, messages]
  );

  return emitReadEvent;
};
