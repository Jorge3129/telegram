import {combineReducers} from "redux";
import messageReducer from '../components/main-chat/messages.reducer'
import chatReducer from '../components/chat-sidebar/chats.reducer'
import mainChatReducer from '../components/main-chat/main.chat.reducer'

const rootReducer = combineReducers({
    messages: messageReducer,
    chats: chatReducer,
    mainChat: mainChatReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
