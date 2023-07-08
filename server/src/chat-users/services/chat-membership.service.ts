import { ForbiddenException, Injectable } from '@nestjs/common';
import { ChatUserRepository } from './chat-user.repository';

@Injectable()
export class ChatMembershipService {
  constructor(private chatUserRepo: ChatUserRepository) {}

  public async checkUserChatMembership(
    userId: number,
    chatId: number,
  ): Promise<void> {
    const isMember = await this.isUserMemberOfChat(userId, chatId);

    if (!isMember) {
      throw new ForbiddenException();
    }
  }

  public async isUserMemberOfChat(
    userId: number,
    chatId: number,
  ): Promise<boolean> {
    const member = await this.chatUserRepo.findOneBy({ userId, chatId });

    return !!member;
  }
}
