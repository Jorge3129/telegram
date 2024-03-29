import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/rootReducer";
import { isTextMessage, Message } from "../models/message.model";
import { PollVotePercentage } from "../../polls/models/poll-vote-percentage";
import { PollAnswerOptionWithUsers } from "../../polls/models/poll-answer-option-with-user";
import { isMessageSentBefore } from "../utils/is-message-sent-before";
import { updatePoll } from "./message-state.utils";
import { Poll } from "../../polls/models/poll.model";

export interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: boolean;
}

const initialState: MessagesState = {
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
        .filter((message) => message.isCurrentUserAuthor)
        .filter((message) => isMessageSentBefore(message, payload.message))
        .forEach((msg) => {
          msg.seen = true;
        });
    },

    updateReadsByCurrentUser: (
      state,
      { payload }: PayloadAction<{ message: Message }>
    ) => {
      state.messages
        .filter((message) => isMessageSentBefore(message, payload.message))
        .forEach((msg) => {
          msg.isReadByCurrentUser = true;
        });
    },

    addPollVote: (
      state,
      {
        payload,
      }: PayloadAction<{
        messageId: string;
        selectedOptionIds: string[];
        votesPercentages: PollVotePercentage[];
      }>
    ) => {
      updatePoll(state, payload.messageId, (poll) => {
        poll.userSelectedOptionIds = payload.selectedOptionIds;
        poll.votesPercentages = payload.votesPercentages;
        poll.totalVotesCount = poll.totalVotesCount + 1;
      });
    },

    retractPollVote: (
      state,
      { payload }: PayloadAction<{ messageId: string }>
    ) => {
      updatePoll(state, payload.messageId, (poll) => {
        poll.userSelectedOptionIds = [];
        poll.votesPercentages = undefined;
        poll.totalVotesCount = poll.totalVotesCount - 1;
      });
    },

    setPollVotePercentages: (
      state,
      {
        payload,
      }: PayloadAction<{
        messageId: string;
        votePercentages: PollVotePercentage[] | undefined;
        votesCount: number;
      }>
    ) => {
      updatePoll(state, payload.messageId, (poll) => {
        poll.votesPercentages = payload.votePercentages;
        poll.totalVotesCount = payload.votesCount;
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
      updatePoll(state, payload.messageId, (poll) => {
        poll.answerOptionsWithUsers = payload.results;
      });
    },
  },
});

export const MessageActions = messageSlice.actions;

export const selectMessages = (state: RootState) => state.messages;

export default messageSlice.reducer;
