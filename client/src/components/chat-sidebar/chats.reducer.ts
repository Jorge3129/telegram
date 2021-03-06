import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IChat, IMessage} from "../../types/types";
import {RootState} from "../../redux/rootReducer";
import api from "../../api/api";

interface ChatState {
    chats: IChat[];
    loading: boolean;
    error: boolean;
    width: string;
}

const initialState: ChatState = {
    chats: [],
    loading: false,
    error: false,
    width: '',
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
        setSeenLastMessage: (state, {payload}: PayloadAction<{ message: IMessage }>) => {
            const {message} = payload;
            //console.log(message, chatId)
            const chat = state.chats.find(chat => chat.id === message.chatId);
            if (chat?.lastMessage) {
                //console.log(chat.lastMessage.messageId, message.messageId)
                if (chat.lastMessage.messageId === message.messageId) chat.lastMessage.seen = true;
            }
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
        },
        setChatsWidth: (state, {payload}: PayloadAction<string>) => {
            state.width = payload;
        }
    }
})

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
