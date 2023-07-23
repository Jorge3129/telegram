import { useSelector } from "react-redux";
import { ChatActions } from "../../chats/chats.reducer";
import { selectCurrentChat } from "../../current-chat/reducers/current-chat.reducer";
import { useAppDispatch } from "../../redux/store";
import { isMessageSeen } from "../../utils/is-message-seen";
import { messageApiService } from "../messages-api.service";
import { Message } from "../models/message.model";

export const useEmitMessageRead = (messages: Message[]) => {
  const { currentChatId, currentChat } = useSelector(selectCurrentChat);
  const dispatch = useAppDispatch();

  const emitReadEvent = (message: Message): void => {
    if (
      !currentChat ||
      isMessageSeen(message.timestamp, currentChat.unread, messages)
    ) {
      return;
    }

    const index = messages.indexOf(message);

    dispatch(
      ChatActions.setUnread({
        unread: messages.slice(index + 1).length,
        chatId: currentChatId || -1,
      })
    );

    void messageApiService.updateMessageReads(message);
  };

  return emitReadEvent;
};
