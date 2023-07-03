import environment from "../environment/environment";
import { HttpClient, httpClient } from "../shared/http/http-client";
import { IChat, IMessage } from "../types/types";

export class ChatsApiService {
  constructor(private readonly http: HttpClient) {}

  public async getChats(userId: number): Promise<IChat[]> {
    return await this.http.get<IChat[]>(
      `${environment.apiUrl}/chats/${userId}`
    );
  }

  public async getMessages(chatId: number) {
    return await this.http.get<IMessage[]>(
      `${environment.apiUrl}/chats/${chatId}/messages`
    );
  }
}

export const chatsApiService = new ChatsApiService(httpClient);
