import {combineReducers} from "redux";
import messageReducer from './messages.reducer'
import chatReducer from './chats.reducer'
import mainChatReducer from './main.chat.reducer'

const rootReducer = combineReducers({
    messages: messageReducer,
    chats: chatReducer,
    mainChat: mainChatReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
