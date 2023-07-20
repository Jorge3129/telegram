import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/rootReducer";
import { chatsApiService } from "./chats-api.service";
import { Chat } from "./models/chat.model";
import { isTextMessage, Message } from "../messages/models/message.model";

interface ChatState {
  chats: Chat[];
  loading: boolean;
  error: boolean;
}

const initialState: ChatState = {
  chats: [],
  loading: false,
  error: false,
};

const updateChat = (
  state: ChatState,
  chatId: number,
  action: (chat: Chat) => void
) => {
  const chat = state.chats.find((chat) => chat.id === chatId);

  if (chat) {
    action(chat);
  }
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setChats: (state, { payload }: PayloadAction<Chat[]>) => {
      state.chats = payload;
    },

    setLastMessage: (
      state,
      { payload }: PayloadAction<{ message: Message; chatId: number }>
    ) => {
      updateChat(state, payload.chatId, (chat) => {
        chat.lastMessage = payload.message;
      });
    },

    editLastMessage: (
      state,
      {
        payload,
      }: PayloadAction<{ messageId: string; text: string; chatId: number }>
    ) => {
      updateChat(state, payload.chatId, (chat) => {
        if (
          chat.lastMessage?.id === payload.messageId &&
          isTextMessage(chat.lastMessage)
        ) {
          chat.lastMessage.text = payload.text;
        }
      });
    },

    setSeenLastMessage: (
      state,
      { payload }: PayloadAction<{ message: Message }>
    ) => {
      const { message } = payload;

      updateChat(state, message.chatId, (chat) => {
        if (chat.lastMessage?.id === message.id) {
          chat.lastMessage.seen = true;
        }
      });
    },

    setUnread: (
      state,
      { payload }: PayloadAction<{ unread: number; chatId: number }>
    ) => {
      updateChat(state, payload.chatId, (chat) => {
        chat.unread = payload.unread;
      });
    },

    incrementUnread: (
      state,
      { payload }: PayloadAction<{ chatId: number }>
    ) => {
      updateChat(state, payload.chatId, (chat) => {
        chat.unread = chat.unread + 1;
      });
    },

    setOnline: (
      state,
      { payload }: PayloadAction<{ online: boolean; chatId: number }>
    ) => {
      updateChat(state, payload.chatId, (chat) => {
        chat.online = payload.online;
      });
    },
  },
});

export const ChatActions = chatSlice.actions;

export const chatThunk = createAsyncThunk(
  "/chats/get",
  async (_: number, thunkApi) => {
    try {
      thunkApi.dispatch(ChatActions.setLoading(true));
      const messages = await chatsApiService.getChats();

      thunkApi.dispatch(ChatActions.setChats(messages));
    } catch (e) {
      console.log(e);
    } finally {
      thunkApi.dispatch(ChatActions.setLoading(false));
    }
  }
);

export const selectChats = (state: RootState) => state.chats;

export default chatSlice.reducer;
