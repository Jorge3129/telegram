import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../redux/rootReducer";
import {IContextMenu} from "../../types/types";


interface MenuState {
    contextMenu: IContextMenu;
}

const initialState: MenuState = {
    contextMenu: null
}

const menuSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setContextMenu: (state, {payload}: PayloadAction<IContextMenu>) => {
            state.contextMenu = payload;
        },
    }
})

export const {setContextMenu} = menuSlice.actions;

export const selectContextMenu = (state: RootState) => state.contextMenu

export default menuSlice.reducer
