import environment from "../environment/environment";
import { HttpClient, httpClient } from "../shared/http/http-client";
import { User } from "../types/types";

export class UsersApiService {
  constructor(private readonly http: HttpClient) {}

  public async getUser(userId: number): Promise<User> {
    return await this.http.get<User>(`${environment.apiUrl}/users/${userId}`);
  }
}

export const usersApiService = new UsersApiService(httpClient);
