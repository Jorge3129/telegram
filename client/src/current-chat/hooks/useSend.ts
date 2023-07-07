import { MessageActions } from "../../messages/messages.reducer";
import { ChatActions } from "../../chats/chats.reducer";
import {
  selectCurrentChat,
  CurrentChatActions,
} from "../reducers/main.chat.reducer";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { selectUser } from "../../redux/user-reducer";
import { CreateMessageDto, Message } from "../../messages/models/message.model";

export const useSend = (socket: Socket) => {
  const { currentChatId, text, media } = useSelector(selectCurrentChat);
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
      text,
      timestamp: new Date().toISOString(),
      chatId: currentChatId || 0,
      media,
    };

    dispatch(CurrentChatActions.setText(""));

    const response = await new Promise<Message>((res) => {
      socket.emit("message", { message }, (savedMessage: Message) => {
        res(savedMessage);
      });
    });

    dispatchSendMessage(response);
  };

  return handleSend;
};
