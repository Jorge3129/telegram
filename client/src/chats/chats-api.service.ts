import environment from "../environment/environment";
import { HttpClient, httpClient } from "../shared/http/http-client";
import { Chat, Message } from "../types/types";

export class ChatsApiService {
  constructor(private readonly http: HttpClient) {}

  public async getChats(userId: number): Promise<Chat[]> {
    return await this.http.get<Chat[]>(`${environment.apiUrl}/chats`);
  }

  public async getMessages(chatId: number) {
    return await this.http.get<Message[]>(
      `${environment.apiUrl}/chats/${chatId}/messages`
    );
  }
}

export const chatsApiService = new ChatsApiService(httpClient);
