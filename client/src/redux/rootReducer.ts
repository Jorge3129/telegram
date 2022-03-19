import {combineReducers} from "redux";
import messageReducer from './messages.reducer'
import chatReducer from './chats.reducer'

const rootReducer = combineReducers({
    messages: messageReducer,
    chats: chatReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
