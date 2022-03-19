import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IChat} from "../types/types";
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
    }
})

export const {setLoading, setChats} = chatSlice.actions;

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
