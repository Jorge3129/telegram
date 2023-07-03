import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../../types/types";
import { RootState } from "../../../redux/rootReducer";
import { chatsApiService } from "../../../chats/chats-api.service";

interface MessageState {
  messages: Message[];
  loading: boolean;
  error: boolean;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: false,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setMessages: (state, { payload }: PayloadAction<Message[]>) => {
      state.messages = payload;
    },
    addMessage: (state, { payload }: PayloadAction<Message>) => {
      state.messages.push(payload);
    },
    setSeenMessage: (
      state,
      { payload }: PayloadAction<{ message: Message; username: string }>
    ) => {
      const username = payload.username;

      state.messages
        .filter(
          (msg) =>
            msg.author === payload.message.author &&
            new Date(msg.timestamp) <= new Date(payload.message.timestamp)
        )
        .forEach((msg) => {
          //console.log(msg.seenBy)
          if (!msg.seenBy) msg.seenBy = [username];
          if (!msg.seenBy.includes(username)) msg.seenBy.push(username);
          //console.log(msg.seenBy)
          if (msg.seen) return;
          msg.seen = true;
        });
    },
  },
});

export const { setLoading, setMessages, addMessage, setSeenMessage } =
  messageSlice.actions;

export const messageThunk = createAsyncThunk(
  "/messages/get",
  async (id: number, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));

      await (async () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(""), 200);
        });
      })();

      const messages = await chatsApiService.getMessages(id);
      thunkApi.dispatch(setMessages(messages));
    } catch (e) {
      console.log(e);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const selectMessages = (state: RootState) => state.messages;

export default messageSlice.reducer;
