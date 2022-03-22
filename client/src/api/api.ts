import axios from "axios";
import {IChat, IMessage, IUser} from "../types/types";
import {SERVER_URL} from "../config";

class Api {
    async getMessages(chatId: number) {
        return await axios.get<IMessage[]>(SERVER_URL + '/messages/' + chatId)
    }

    async getChats(user: string) {
        return await axios.get<IChat[]>(SERVER_URL + '/chats/' + user)
    }

    async login(login: IUser) {
        return await axios.post(SERVER_URL + '/auth/login', login);
    }
}

export default new Api()
