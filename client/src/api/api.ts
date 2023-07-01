import axios from "axios";
import { IChat, IMessage, IUser, User } from "../types/types";
import { SERVER_URL } from "../config";

export class Api {
  static async getMessages(chatId: number) {
    return await axios.get<IMessage[]>(SERVER_URL + "/messages/" + chatId);
  }

  static async getChats(userId: number) {
    return await axios.get<IChat[]>(SERVER_URL + "/chats/" + userId);
  }

  static async login(login: IUser) {
    try {
      return await axios.post(SERVER_URL + "/auth/login", login);
    } catch (e) {
      return {
        data: {
          success: false,
        },
        error: e,
      };
    }
  }

  static async getUser(userId: number): Promise<User> {
    return (await axios.get<User>(SERVER_URL + "/auth/users/" + userId)).data;
  }
}

export default Api;
