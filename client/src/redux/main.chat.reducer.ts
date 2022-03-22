import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IChat} from "../types/types";
import {RootState} from "./rootReducer";

interface MainChatState {
    chatId: number | null,
    mainChat: IChat | null,
}

const initialState: MainChatState = {
    chatId: null,
    mainChat: null
}

const mainChatSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setChatId: (state, {payload}: PayloadAction<number>) => {
            //console.log(payload)
            state.chatId = payload;
        }
    }
})

export const {setChatId} = mainChatSlice.actions;

export const selectMainChat = (state: RootState) => state.mainChat

export default mainChatSlice.reducer
