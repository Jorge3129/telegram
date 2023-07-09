import environment from "../environment/environment";
import { HttpClient, httpClient } from "../shared/http/http-client";
import { Message } from "../messages/models/message.model";
import {
  CreateGifMessageDto,
  CreateMessageDto,
} from "./models/create-message.dto";

export class MessageApiService {
  constructor(private readonly http: HttpClient) {}

  public async create(dto: CreateMessageDto): Promise<Message> {
    return await this.http.post<Message>(`${environment.apiUrl}/messages`, dto);
  }

  public async createGif(dto: CreateGifMessageDto): Promise<Message> {
    return await this.http.post<Message>(
      `${environment.apiUrl}/messages/gif`,
      dto
    );
  }

  public async delete(id: string): Promise<void> {
    await this.http.delete<void>(`${environment.apiUrl}/messages/${id}`);
  }

  public async edit(id: string, textContent: string): Promise<void> {
    await this.http.patch<void>(`${environment.apiUrl}/messages/${id}`, {
      textContent,
    });
  }

  public async updateMessageReads(message: Message): Promise<void> {
    await this.http.put(`${environment.apiUrl}/messages`, message);
  }
}

export const messageApiService = new MessageApiService(httpClient);
