import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/rootReducer";
import { MessageContextMenuInfo } from "../../../shared/models/message-context-menu";

interface MenuState {
  contextMenu: MessageContextMenuInfo;
}

const initialState: MenuState = {
  contextMenu: null,
};

const menuSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setContextMenu: (
      state,
      { payload }: PayloadAction<MessageContextMenuInfo>
    ) => {
      state.contextMenu = payload;
    },
  },
});

export const { setContextMenu } = menuSlice.actions;

export const selectContextMenu = (state: RootState) => state.contextMenu;

export default menuSlice.reducer;
