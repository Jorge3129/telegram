import { MessageActions } from "../../messages/messages.reducer";
import { ChatActions } from "../../chats/chats.reducer";
import {
  selectCurrentChat,
  CurrentChatActions,
} from "../reducers/current-chat.reducer";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user-reducer";
import { CreateMessageDto, Message } from "../../messages/models/message.model";
import { messageApiService } from "../../messages/messages-api.service";

export const useSend = (inputText: string) => {
  const { currentChatId, media } = useSelector(selectCurrentChat);
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);

  const dispatchSendMessage = (message: Message) => {
    dispatch(MessageActions.addMessage(message));

    dispatch(ChatActions.setLastMessage({ message, chatId: message.chatId }));
    //dispatch(setSrc(''))

    dispatch(ChatActions.setUnread({ unread: 0, chatId: message.chatId }));
  };

  const handleSend = async () => {
    if (!user) {
      return;
    }

    const message: CreateMessageDto = {
      text: inputText,
      timestamp: new Date().toISOString(),
      chatId: currentChatId || 0,
      media,
    };

    dispatch(CurrentChatActions.clearInput());

    const response = await messageApiService.create(message);

    dispatchSendMessage(response);
  };

  return handleSend;
};
