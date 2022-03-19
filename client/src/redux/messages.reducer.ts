import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMessage} from "../types/types";
import {RootState} from "./rootReducer";
import api from "../api/api";

interface MessageState {
    messages: IMessage[]
    loading: boolean
    error: boolean
}

const initialState: MessageState = {
    messages: [],
    loading: false,
    error: false,
}

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.loading = payload;
        },
        setMessages: (state, {payload}: PayloadAction<IMessage[]>) => {
            state.messages = payload;
        },
        addMessage: (state, {payload}: PayloadAction<IMessage>) => {
            state.messages.push(payload);
        }
    }
})

export const {setLoading, setMessages, addMessage} = messageSlice.actions;

export const messageThunk = createAsyncThunk('/messages/get',
    async (id: number, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading(true))

            await (async () => {
                return new Promise((resolve) => {
                    setTimeout(() => resolve(''), 500);
                })
            })();

            const response = await api.getMessages(id);
            const messages = response.data;
            thunkApi.dispatch(setMessages(messages))
        } catch (e) {
            console.log(e)
        } finally {
            thunkApi.dispatch(setLoading(false));
        }
    })

export const selectMessages = (state: RootState) => state.messages

export default messageSlice.reducer
