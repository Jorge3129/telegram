import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Media } from "../../../types/types";
import { RootState } from "../../../redux/rootReducer";
import { Chat } from "../../../chats/models/chat.model";

interface MainChatState {
  chatId: number | null;
  mainChat: Chat | null;
  text: string;
  media: Media;
}

const initialState: MainChatState = {
  chatId: null,
  mainChat: null,
  text: "",
  media: {
    filename: "",
    type: "",
  },
};

const mainChatSlice = createSlice({
  name: "mainChat",
  initialState,
  reducers: {
    setChatId: (state, { payload }: PayloadAction<number>) => {
      state.chatId = payload;
      state.text = "";
    },
    setChat: (state, { payload }: PayloadAction<Chat>) => {
      state.mainChat = payload;
    },
    setText: (state, { payload }: PayloadAction<string>) => {
      state.text = payload;
    },
    addText: (state, { payload }: PayloadAction<string>) => {
      state.text += payload;
    },
    setMedia: (state: MainChatState, { payload }: PayloadAction<Media>) => {
      state.media = payload;
    },
    clearMedia: (state: MainChatState, { payload }: PayloadAction) => {
      state.media = { ...initialState.media };
    },
    clearMainChat: (state: MainChatState, { payload }: PayloadAction) => {
      return initialState;
    },
  },
});

export const {
  setChatId,
  setChat,
  setText,
  addText,
  setMedia,
  clearMedia,
  clearMainChat,
} = mainChatSlice.actions;

export const selectMainChat = (state: RootState) => state.mainChat;

export default mainChatSlice.reducer;
