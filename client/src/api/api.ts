import axios from "axios";
import {IChat, IMessage, IUser} from "../types/types";
import {SERVER_URL} from "../config";

export class Api {

    static async getMessages(chatId: number) {
        return await axios.get<IMessage[]>(SERVER_URL + '/messages/' + chatId)
    }

    static async getChats(user: string) {
        return await axios.get<IChat[]>(SERVER_URL + '/chats/' + user)
    }

    static async login(login: IUser) {
        try {
            return await axios.post(SERVER_URL + '/auth/login', login);
        } catch (e) {
            return {
                data: {
                    success: false,
                },
                error: e,
            };
        }

    }
}

export default Api;
