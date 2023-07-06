import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import {
  addMessage,
  setSeenMessage,
} from "../components/main-chat/reducers/messages.reducer";
import { useAppDispatch } from "../redux/store";
import {
  incrementUnread,
  setLastMessage,
  setOnline,
  setSeenLastMessage,
} from "../chats/chats.reducer";
import { useSelector } from "react-redux";
import { selectMainChat } from "../components/main-chat/reducers/main.chat.reducer";
import { selectUser } from "../redux/user-reducer";
import environment from "../environment/environment";
import { Message } from "../messages/message.model";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();
  const { currentChatId: chatId } = useSelector(selectMainChat);

  const { user } = useSelector(selectUser);

  const onMessage = useCallback(
    (message: Message) => {
      if (chatId === message.chatId) {
        dispatch(addMessage(message));
      }

      dispatch(setLastMessage({ message, chatId: message.chatId }));
      dispatch(incrementUnread({ chatId: message.chatId }));
    },
    [chatId, dispatch]
  );

  const onSeen = useCallback(
    ({
      message,
      username,
    }: {
      message: Message;
      userId: number;
      username: string;
    }) => {
      if (chatId === message.chatId) {
        dispatch(setSeenMessage({ message, username }));
      }
      dispatch(setSeenLastMessage({ message }));
    },
    [chatId, dispatch]
  );

  useEffect(() => {
    if (!user) {
      return;
    }

    const newSocket = io(`${environment.wsUrl}`, {
      query: { userId: user.id },
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("online-change", ({ online, chatId }) => {
      dispatch(setOnline({ online, chatId }));
    });
    socket.on("message-to-client", onMessage);
    socket.on("seen", onSeen);

    return () => {
      socket.off("message-to-client");
      socket.off("seen");
      socket.off("online-change");
    };
  }, [chatId, dispatch, onMessage, onSeen, socket]);

  return [socket, setSocket] as [
    Socket | null,
    Dispatch<SetStateAction<Socket | null>>
  ];
};
