import {combineReducers} from "redux";
import messageReducer from '../components/main-chat/reducers/messages.reducer'
import chatReducer from '../components/chat-sidebar/chats.reducer'
import mainChatReducer from '../components/main-chat/reducers/main.chat.reducer'
import menuReducer from '../components/main-chat/reducers/menu.reducer'

const rootReducer = combineReducers({
    messages: messageReducer,
    chats: chatReducer,
    mainChat: mainChatReducer,
    contextMenu: menuReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
