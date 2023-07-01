import { addMessage, selectMessages } from "../reducers/messages.reducer";
import { setLastMessage, setUnread } from "../../chat-sidebar/chats.reducer";
import { selectMainChat, setText } from "../reducers/main.chat.reducer";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { IMessage } from "../../../types/types";
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

  const handleSend = () => {
    const lastMsg = messages.at(-1);
    const id = lastMsg ? lastMsg.id + 1 : messages.length;

    if (!user) {
      return;
    }

    const message: IMessage = {
      text,
      timestamp: new Date().toISOString(),
      authorId: user.id,
      author: user.username,
      chatId: chatId || 0,
      id: id,
      media,
    };

    socket.emit("message", { message }, (savedMessage: IMessage) => {
      console.log({ savedMessage });
    });

    dispatchSendMessage(message);
  };

  return handleSend;
};
