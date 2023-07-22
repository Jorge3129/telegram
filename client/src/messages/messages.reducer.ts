import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/rootReducer";
import { chatsApiService } from "../chats/chats-api.service";
import { isPollMessage, isTextMessage, Message } from "./models/message.model";
import { PollVotePercentage } from "../polls/models/poll-vote-percentage";
import { PollAnswerOptionWithUsers } from "../polls/models/poll-answer-option-with-user";

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

    editMessage: (
      state,
      { payload }: PayloadAction<{ messageId: string; text: string }>
    ) => {
      state.messages
        .filter((message) => message.id === payload.messageId)
        .forEach((message) => {
          if (isTextMessage(message)) {
            message.text = payload.text;
            message.edited = true;
          }
        });
    },

    deleteMessage: (state, { payload: deletedId }: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (message) => message.id !== deletedId
      );
    },

    setSeenMessage: (
      state,
      { payload }: PayloadAction<{ message: Message; userId: number }>
    ) => {
      state.messages
        .filter(
          (message) =>
            new Date(message.timestamp) <= new Date(payload.message.timestamp)
        )
        .forEach((msg) => {
          msg.seen = true;
        });
    },

    addPollVote: (
      state,
      {
        payload,
      }: PayloadAction<{ messageId: string; selectedOptionIds: string[] }>
    ) => {
      state.messages
        .filter((message) => message.id === payload.messageId)
        .forEach((message) => {
          if (isPollMessage(message)) {
            message.poll.userSelectedOptionIds = payload.selectedOptionIds;
          }
        });
    },

    retractPollVote: (
      state,
      { payload }: PayloadAction<{ messageId: string }>
    ) => {
      state.messages
        .filter((message) => message.id === payload.messageId)
        .forEach((message) => {
          if (isPollMessage(message)) {
            message.poll.userSelectedOptionIds = [];
          }
        });
    },

    setPollVotePercentages: (
      state,
      {
        payload,
      }: PayloadAction<{
        messageId: string;
        votePercentages: PollVotePercentage[] | undefined;
      }>
    ) => {
      state.messages
        .filter((message) => message.id === payload.messageId)
        .forEach((message) => {
          if (isPollMessage(message)) {
            message.poll.votesPercentages = payload.votePercentages;
          }
        });
    },

    setPollVoteResults: (
      state,
      {
        payload,
      }: PayloadAction<{
        messageId: string;
        results: PollAnswerOptionWithUsers[] | undefined;
      }>
    ) => {
      state.messages
        .filter((message) => message.id === payload.messageId)
        .forEach((message) => {
          if (isPollMessage(message)) {
            message.poll.answerOptionsWithUsers = payload.results;
          }
        });
    },
  },
});

export const MessageActions = messageSlice.actions;

export const messageThunk = createAsyncThunk(
  "/messages/get",
  async (id: number, thunkApi) => {
    try {
      thunkApi.dispatch(MessageActions.setLoading(true));

      const messages = await chatsApiService.getMessages(id);
      thunkApi.dispatch(MessageActions.setMessages(messages));
    } catch (e) {
      console.log(e);
    } finally {
      thunkApi.dispatch(MessageActions.setLoading(false));
    }
  }
);

export const selectMessages = (state: RootState) => state.messages;

export default messageSlice.reducer;
