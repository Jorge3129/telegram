import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { MessageActions } from "../messages/messages.reducer";
import { useAppDispatch } from "../redux/store";
import { ChatActions } from "../chats/chats.reducer";
import { useSelector } from "react-redux";
import { selectCurrentChat } from "../current-chat/reducers/main.chat.reducer";
import { selectUser } from "../redux/user-reducer";
import environment from "../environment/environment";
import { Message } from "../messages/models/message.model";
import { tokenService } from "../auth/services/token.service";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();
  const { currentChatId } = useSelector(selectCurrentChat);

  const { user } = useSelector(selectUser);

  const onMessage = useCallback(
    (message: Message) => {
      if (currentChatId === message.chatId) {
        dispatch(MessageActions.addMessage(message));
      }

      dispatch(ChatActions.setLastMessage({ message, chatId: message.chatId }));
      dispatch(ChatActions.incrementUnread({ chatId: message.chatId }));
    },
    [currentChatId, dispatch]
  );

  const onSeen = useCallback(
    ({ message, userId }: { message: Message; userId: number }) => {
      if (currentChatId === message.chatId) {
        dispatch(MessageActions.setSeenMessage({ message, userId }));
      }
      dispatch(ChatActions.setSeenLastMessage({ message }));
    },
    [currentChatId, dispatch]
  );

  const onDeleted = useCallback(
    (messageId: string) => {
      dispatch(MessageActions.deleteMessage(messageId));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!user) {
      return;
    }

    const newSocket = io(`${environment.wsUrl}`, {
      extraHeaders: {
        authorization: tokenService.getBearer(),
      },
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
      dispatch(ChatActions.setOnline({ online, chatId }));
    });
    socket.on("message-to-client", onMessage);
    socket.on("seen", onSeen);
    socket.on("message-deleted", onDeleted);

    return () => {
      socket.off("message-to-client");
      socket.off("seen");
      socket.off("online-change");
    };
  }, [currentChatId, dispatch, onMessage, onSeen, onDeleted, socket]);

  return [socket, setSocket] as [
    Socket | null,
    Dispatch<SetStateAction<Socket | null>>
  ];
};
