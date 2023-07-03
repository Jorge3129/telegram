import environment from "../environment/environment";
import { HttpClient, httpClient } from "../shared/http/http-client";
import { Chat } from "./models/chat.model";
import { Message } from "../messages/message.model";

export class ChatsApiService {
  constructor(private readonly http: HttpClient) {}

  public async getChats(): Promise<Chat[]> {
    return await this.http.get<Chat[]>(`${environment.apiUrl}/chats`);
  }

  public async getMessages(chatId: number): Promise<Message[]> {
    return await this.http.get<Message[]>(
      `${environment.apiUrl}/chats/${chatId}/messages`
    );
  }
}

export const chatsApiService = new ChatsApiService(httpClient);
