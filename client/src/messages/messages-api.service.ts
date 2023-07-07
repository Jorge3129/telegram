import environment from "../environment/environment";
import { HttpClient, httpClient } from "../shared/http/http-client";
import { CreateMessageDto, Message } from "../messages/models/message.model";

export class MessageApiService {
  constructor(private readonly http: HttpClient) {}

  public async createMessage(dto: CreateMessageDto): Promise<Message> {
    return await this.http.post<Message>(`${environment.apiUrl}/messages`, dto);
  }

  public async updateMessageReads(message: Message): Promise<void> {
    await this.http.put(`${environment.apiUrl}/messages`, message);
  }
}

export const messageApiService = new MessageApiService(httpClient);