export class MockAuthService {
  private currentUserId: number | null = null;

  public async login(userId: number): Promise<void> {
    this.currentUserId = userId;
  }

  public async logout(): Promise<void> {
    this.currentUserId = null;
  }

  public getCurrentUserId(): number | null {
    return this.currentUserId;
  }
}

export const mockAuthService = new MockAuthService();
