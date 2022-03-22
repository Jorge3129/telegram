import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IChat} from "../../types/types";
import {RootState} from "../../redux/rootReducer";

interface MainChatState {
    chatId: number | null,
    mainChat: IChat | null,
    text: string;
}

const initialState: MainChatState = {
    chatId: null,
    mainChat: null,
    text: '',
}

const mainChatSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setChatId: (state, {payload}: PayloadAction<number>) => {
            state.chatId = payload;
            state.text = ''
        },
        setChat: (state, {payload}: PayloadAction<IChat>) => {
            state.mainChat = payload;
        },
        setText: (state, {payload}: PayloadAction<string>) => {
            state.text = payload;
        },
        addText: (state, {payload}: PayloadAction<string>) => {
            state.text += payload;
        }
    }
})

export const {setChatId, setChat, setText, addText} = mainChatSlice.actions;

export const selectMainChat = (state: RootState) => state.mainChat

export default mainChatSlice.reducer
