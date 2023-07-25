import { combineReducers } from "redux";
import messageReducer from "../messages/state/messages.reducer";
import chatReducer from "../chats/chats.reducer";
import currentChatReducer from "../current-chat/reducers/current-chat.reducer";
import userReducer from "./user-reducer";

const rootReducer = combineReducers({
  messages: messageReducer,
  chats: chatReducer,
  currentChat: currentChatReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
