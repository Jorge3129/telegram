import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatsApiService } from "../../chats/chats-api.service";
import { MessageActions } from "./messages.reducer";
import { BehaviorSubject } from "rxjs";
import { Message } from "../models/message.model";

export const messagesFetched$ = new BehaviorSubject<Message[]>([]);

export const fetchMessagesThunk = createAsyncThunk(
  "/messages/get",
  async (id: number, thunkApi) => {
    try {
      thunkApi.dispatch(MessageActions.setLoading(true));

      const messages = await chatsApiService.getMessages(id);
      thunkApi.dispatch(MessageActions.setMessages(messages));

      messagesFetched$.next(messages);
    } catch (e) {
      console.log(e);
    } finally {
      thunkApi.dispatch(MessageActions.setLoading(false));
    }
  }
);
