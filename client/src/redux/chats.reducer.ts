import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IChat, IMessage} from "../types/types";
import {RootState} from "./rootReducer";
import api from "../api/api";

interface ChatState {
    chats: IChat[]
    loading: boolean
    error: boolean
}

const initialState: ChatState = {
    chats: [],
    loading: false,
    error: false,
}

const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.loading = payload;
        },
        setChats: (state, {payload}: PayloadAction<IChat[]>) => {
            state.chats = payload;
        },
        setLastMessage: (state, {payload}: PayloadAction<{ message: IMessage, chatId: number }>) => {
            const {message, chatId} = payload;
            const chat = state.chats.find(chat => chat.id === chatId);
            if (chat) chat.lastMessage = message;
        },
        setUnread: (state, {payload}: PayloadAction<{ unread: number, chatId: number }>) => {
            const {unread, chatId} = payload;
            const chat = state.chats.find(chat => chat.id === chatId);
            if (chat) chat.unread = unread;
        },
        incrementUnread: (state, {payload}: PayloadAction<{ chatId: number }>) => {
            const {chatId} = payload;
            const chat = state.chats.find(chat => chat.id === chatId);
            if (chat) chat.unread = chat.unread + 1;
        },
        setOnline: (state, {payload}: PayloadAction<{ online: boolean, chatId: number }>) => {
            const {online, chatId} = payload;
            const chat = state.chats.find(chat => chat.id === chatId);
            if (chat) chat.online = online;
        }
    }
})

export const {setLoading, setChats, setLastMessage, setUnread, incrementUnread, setOnline} = chatSlice.actions;

export const chatThunk = createAsyncThunk('/chats/get',
    async (user: string, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading(true))
            const response = await api.getChats(user);
            const messages = response.data;
            thunkApi.dispatch(setChats(messages))
        } catch (e) {
            console.log(e)
        } finally {
            thunkApi.dispatch(setLoading(false));
        }
    })

export const selectChats = (state: RootState) => state.chats

export default chatSlice.reducer
