import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IChat, IMedia} from "../../../types/types";
import {RootState} from "../../../redux/rootReducer";

interface MainChatState {
    chatId: number | null,
    mainChat: IChat | null,
    text: string;
    media: IMedia;
}

const initialState: MainChatState = {
    chatId: null,
    mainChat: null,
    text: '',
    media: {
        filename: '',
        type: ''
    }
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
        setMedia: (state: MainChatState, {payload}: PayloadAction<IMedia>) => {
            state.media = payload;
        },
        clearMedia: (state: MainChatState, {payload}: PayloadAction) => {
            state.media = {...initialState.media};
        },
    }
})

export const {setChatId, setChat, setText, addText, setMedia, clearMedia} = mainChatSlice.actions;

export const selectMainChat = (state: RootState) => state.mainChat

export default mainChatSlice.reducer
