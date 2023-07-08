import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/rootReducer";
import { Chat } from "../../chats/models/chat.model";
import { Media } from "../../messages/models/message.model";
import { ChatInputState, CurrentChatState } from "./current-chat-state.type";

const initialState: CurrentChatState = {
  currentChatId: null,
  currentChat: null,
  inputState: {
    type: "create",
  },
  // inputText: "",
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
      state.inputState = initialState.inputState;
    },

    setChat: (state, { payload }: PayloadAction<Chat>) => {
      state.currentChat = payload;
    },

    // setText: (state, { payload }: PayloadAction<string>) => {
    //   state.inputText = payload;
    // },

    setInput: (state, { payload }: PayloadAction<ChatInputState>) => {
      state.inputState = payload;
    },

    clearInput: (state) => {
      state.inputState = initialState.inputState;
    },

    // addText: (state, { payload }: PayloadAction<string>) => {
    //   state.inputText += payload;
    // },

    setMedia: (state: CurrentChatState, { payload }: PayloadAction<Media>) => {
      state.media = payload;
    },

    clearMedia: (state: CurrentChatState) => {
      state.media = { ...initialState.media };
    },

    clearCurrentChat: () => {
      return initialState;
    },
  },
});

export const CurrentChatActions = currentChatSlice.actions;

export const selectCurrentChat = (state: RootState) => state.currentChat;

export default currentChatSlice.reducer;
