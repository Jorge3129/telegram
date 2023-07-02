import { addMessage, selectMessages } from "../reducers/messages.reducer";
import { setLastMessage, setUnread } from "../../chat-sidebar/chats.reducer";
import { selectMainChat, setText } from "../reducers/main.chat.reducer";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { CreateMessageDto, IMessage } from "../../../types/types";
import { selectUser } from "../../../redux/user-reducer";

export const useSend = (socket: Socket) => {
  const { messages } = useSelector(selectMessages);
  const { chatId, text, media } = useSelector(selectMainChat);
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);

  const dispatchSendMessage = (message: IMessage) => {
    dispatch(addMessage(message));
    dispatch(setLastMessage({ message, chatId: message.chatId }));
    dispatch(setText(""));
    //dispatch(setSrc(''))
    dispatch(setUnread({ unread: 0, chatId: message.chatId }));
  };

  const handleSend = async () => {
    if (!user) {
      return;
    }

    const message: CreateMessageDto = {
      text,
      timestamp: new Date().toISOString(),
      authorId: user.id,
      author: user.username,
      chatId: chatId || 0,
      media,
    };

    const response = await new Promise<IMessage>((res) => {
      socket.emit("message", { message }, (savedMessage: IMessage) => {
        res(savedMessage);
      });
    });

    dispatchSendMessage(response);
  };

  return handleSend;
};
