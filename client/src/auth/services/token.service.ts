export class TokenService {
  private readonly ACCESS_TOKEN_KEY = "JWT_TOKEN";

  public getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  public getBearer(): string {
    return `Bearer ${this.getAccessToken() ?? ""}`;
  }

  public setAccessToken(value: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, value);
  }

  public clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }
}

export const tokenService = new TokenService();
