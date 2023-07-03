import environment from "../../environment/environment";
import { HttpClient, httpClient } from "../../shared/http/http-client";
import { User } from "../../types/types";
import { usersApiService } from "../../users/users-api.service";
import { LoginDto } from "../dto/login-dto";
import { SignedTokens } from "../dto/login-response.dto";
import { SignupDto } from "../dto/signup.dto";
import { TokenService, tokenService } from "./token.service";
import jwtDecode from "jwt-decode";

export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public async login(data: LoginDto): Promise<number> {
    const res = await this.http.post<SignedTokens>(
      `${environment.apiUrl}/auth/login`,
      data
    );

    const { accessToken } = res;

    this.tokenService.setAccessToken(accessToken);

    return this.getUserIdFromToken(accessToken);
  }

  public loadUser(id: number): Promise<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  public async loadStoredUser(): Promise<User | null> {
    const token = this.tokenService.getAccessToken();

    if (!token) {
      return null;
    }

    const userId = this.getUserIdFromToken(token);
    const user = await usersApiService.getUser(userId);

    return user;
  }

  public signup(data: SignupDto): Promise<void> {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }

  public async logout(): Promise<void> {
    this.tokenService.clearTokens();
  }

  public getUserIdFromToken(token: string) {
    return jwtDecode<{ id: number }>(token)?.id;
  }
}

export const authService = new AuthService(httpClient, tokenService);
