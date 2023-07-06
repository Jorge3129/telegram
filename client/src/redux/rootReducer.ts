import { combineReducers } from "redux";
import messageReducer from "../components/main-chat/reducers/messages.reducer";
import chatReducer from "../chats/chats.reducer";
import mainChatReducer from "../components/main-chat/reducers/main.chat.reducer";
import userReducer from "./user-reducer";

const rootReducer = combineReducers({
  messages: messageReducer,
  chats: chatReducer,
  mainChat: mainChatReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
