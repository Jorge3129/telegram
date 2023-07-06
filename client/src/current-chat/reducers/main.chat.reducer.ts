import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/rootReducer";
import { Chat } from "../../chats/models/chat.model";
import { Media } from "../../messages/message.model";

interface CurrentChatState {
  currentChatId: number | null;
  currentChat: Chat | null;
  text: string;
  media: Media;
}

const initialState: CurrentChatState = {
  currentChatId: null,
  currentChat: null,
  text: "",
  media: {
    filename: "",
    type: "",
  },
};

const currentChatSlice = createSlice({
  name: "currentChat",
  initialState,
  reducers: {
    setChatId: (state, { payload }: PayloadAction<number>) => {
      state.currentChatId = payload;
      state.text = "";
    },

    setChat: (state, { payload }: PayloadAction<Chat>) => {
      state.currentChat = payload;
    },

    setText: (state, { payload }: PayloadAction<string>) => {
      state.text = payload;
    },

    addText: (state, { payload }: PayloadAction<string>) => {
      state.text += payload;
    },

    setMedia: (state: CurrentChatState, { payload }: PayloadAction<Media>) => {
      state.media = payload;
    },

    clearMedia: (state: CurrentChatState, { payload }: PayloadAction) => {
      state.media = { ...initialState.media };
    },

    clearCurrentChat: (state: CurrentChatState, { payload }: PayloadAction) => {
      state = initialState;
    },
  },
});

export const CurrentChatActions = currentChatSlice.actions;

export const selectCurrentChat = (state: RootState) => state.currentChat;

export default currentChatSlice.reducer;
