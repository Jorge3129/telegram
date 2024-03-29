import environment from "../environment/environment";
import { HttpClient, httpClient } from "../shared/http/http-client";
import { Message } from "../messages/models/message.model";
import { CreateMessageDto } from "./models/create-message.dto";

export class MessageApiService {
  constructor(private readonly http: HttpClient) {}

  public async create(dto: CreateMessageDto): Promise<Message> {
    return await this.http.post<Message>(`${environment.apiUrl}/messages`, dto);
  }

  public async delete(id: string): Promise<void> {
    await this.http.delete<void>(`${environment.apiUrl}/messages/${id}`);
  }

  public async edit(id: string, textContent: string): Promise<void> {
    await this.http.patch<void>(`${environment.apiUrl}/messages/${id}`, {
      textContent,
    });
  }

  public async updateMessageReads(messageId: string): Promise<void> {
    await this.http.post(`${environment.apiUrl}/messages/${messageId}/reads`);
  }
}

export const messageApiService = new MessageApiService(httpClient);
