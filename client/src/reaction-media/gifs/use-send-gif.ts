import { MessageActions } from "../../messages/messages.reducer";
import { ChatActions } from "../../chats/chats.reducer";

import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Message } from "../../messages/models/message.model";
import { messageApiService } from "../../messages/messages-api.service";

import { selectCurrentChat } from "../../current-chat/reducers/current-chat.reducer";
import { IGif } from "@giphy/js-types";

export const useSendGif = () => {
  const { currentChatId } = useSelector(selectCurrentChat);
  const dispatch = useAppDispatch();

  const dispatchSendMessage = (message: Message) => {
    dispatch(MessageActions.addMessage(message));
    dispatch(ChatActions.setLastMessage({ message, chatId: message.chatId }));
    dispatch(ChatActions.setUnread({ unread: 0, chatId: message.chatId }));
  };

  const handleSend = async (gif: IGif) => {
    if (!currentChatId) {
      return;
    }

    const createdMessage = await messageApiService.create({
      type: "gif",
      chatId: currentChatId,
      timestamp: new Date().toISOString(),
      srcObject: gif,
    });

    dispatchSendMessage(createdMessage);
  };

  return handleSend;
};
