import axios from "axios";
import { IChat, IMessage, IUser, User } from "../types/types";
import environment from "../environment/environment";

export class Api {
  static async login(login: IUser) {
    try {
      return await axios.post(`${environment.apiUrl}/auth/login`, login);
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
