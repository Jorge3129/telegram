import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IChat} from "../../types/types";
import {RootState} from "../../redux/rootReducer";

interface MainChatState {
    chatId: number | null,
    mainChat: IChat | null,
    text: string;
    src: string;
}

const initialState: MainChatState = {
    chatId: null,
    mainChat: null,
    text: '',
    src: '',
}

const mainChatSlice = createSlice({
    name: 'mainChat',
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
        },
        setSrc: (state, {payload}: PayloadAction<string>) => {
            console.log('src: ' + payload)
            state.src = payload;
        },
    }
})

export const {setChatId, setChat, setText, addText, setSrc} = mainChatSlice.actions;

export const selectMainChat = (state: RootState) => state.mainChat

export default mainChatSlice.reducer
