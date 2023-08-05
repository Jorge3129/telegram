import { MessageActions } from "../../messages/state/messages.reducer";
import { ChatActions } from "../../chats/chats.reducer";
import {
  selectCurrentChat,
  CurrentChatActions,
} from "../reducers/current-chat.reducer";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Message } from "../../messages/models/message.model";
import { messageApiService } from "../../messages/messages-api.service";
import { CreateMessageDtoWithoutChat } from "../../messages/models/create-message.dto";

export const useSendMessage = () => {
  const { currentChatId } = useSelector(selectCurrentChat);
  const dispatch = useAppDispatch();

  const dispatchSendMessage = (message: Message) => {
    dispatch(MessageActions.addMessage(message));
    dispatch(ChatActions.setLastMessage({ message, chatId: message.chatId }));
    dispatch(ChatActions.setUnread({ unread: 0, chatId: message.chatId }));
  };

  const handleSend = async (messageDto: CreateMessageDtoWithoutChat) => {
    if (!currentChatId) {
      return;
    }

    dispatch(CurrentChatActions.clearInput());

    const response = await messageApiService.create({
      ...messageDto,
      chatId: currentChatId,
    });

    dispatchSendMessage(response);
  };

  return handleSend;
};
