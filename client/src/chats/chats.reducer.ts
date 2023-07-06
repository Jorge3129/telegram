import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/rootReducer";
import { chatsApiService } from "./chats-api.service";
import { Chat } from "./models/chat.model";
import { Message } from "../messages/message.model";

interface ChatState {
  chats: Chat[];
  loading: boolean;
  error: boolean;
  width: string;
}

const initialState: ChatState = {
  chats: [],
  loading: false,
  error: false,
  width: "",
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
      const { message, chatId } = payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) chat.lastMessage = message;
    },
    setSeenLastMessage: (
      state,
      { payload }: PayloadAction<{ message: Message }>
    ) => {
      const { message } = payload;
      //console.log(message, chatId)
      const chat = state.chats.find((chat) => chat.id === message.chatId);
      if (chat?.lastMessage) {
        //console.log(chat.lastMessage.messageId, message.messageId)
        if (chat.lastMessage.id === message.id) chat.lastMessage.seen = true;
      }
    },
    setUnread: (
      state,
      { payload }: PayloadAction<{ unread: number; chatId: number }>
    ) => {
      const { unread, chatId } = payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) chat.unread = unread;
    },
    incrementUnread: (
      state,
      { payload }: PayloadAction<{ chatId: number }>
    ) => {
      const { chatId } = payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) chat.unread = chat.unread + 1;
    },
    setOnline: (
      state,
      { payload }: PayloadAction<{ online: boolean; chatId: number }>
    ) => {
      const { online, chatId } = payload;
      const chat = state.chats.find((chat) => chat.id === chatId);

      if (chat && chat.type === "personal") {
        chat.online = online;
      }
    },
    setChatsWidth: (state, { payload }: PayloadAction<string>) => {
      state.width = payload;
    },
  },
});

export const {
  setLoading,
  setChats,
  setLastMessage,
  setSeenLastMessage,
  setUnread,
  incrementUnread,
  setOnline,
  setChatsWidth,
} = chatSlice.actions;

export const chatThunk = createAsyncThunk(
  "/chats/get",
  async (userId: number, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const messages = await chatsApiService.getChats();

      thunkApi.dispatch(setChats(messages));
    } catch (e) {
      console.log(e);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const selectChats = (state: RootState) => state.chats;

export default chatSlice.reducer;
