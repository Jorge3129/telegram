import { MessageActions } from "../../messages/messages.reducer";
import { ChatActions } from "../../chats/chats.reducer";
import {
  selectCurrentChat,
  CurrentChatActions,
} from "../reducers/current-chat.reducer";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Message } from "../../messages/models/message.model";
import { messageApiService } from "../../messages/messages-api.service";
import { CreateTextMessageDto } from "../../messages/models/create-message.dto";

export const useSend = (inputText: string) => {
  const { currentChatId, media } = useSelector(selectCurrentChat);
  const dispatch = useAppDispatch();

  const dispatchSendMessage = (message: Message) => {
    dispatch(MessageActions.addMessage(message));
    dispatch(ChatActions.setLastMessage({ message, chatId: message.chatId }));
    dispatch(ChatActions.setUnread({ unread: 0, chatId: message.chatId }));
  };

  const handleSend = async () => {
    if (!currentChatId) {
      return;
    }

    const message: CreateTextMessageDto = {
      type: "text",
      text: inputText,
      timestamp: new Date().toISOString(),
      chatId: currentChatId,
      media: media.filename ? media : undefined,
    };

    dispatch(CurrentChatActions.clearInput());

    const response = await messageApiService.create(message);

    dispatchSendMessage(response);
  };

  return handleSend;
};
