import { Injectable } from '@nestjs/common';
import { ChatMembershipService } from '../services/chat-membership.service';

@Injectable()
export class ChatMembershipRequirement {
  constructor(private chatMembershipService: ChatMembershipService) {}

  public async validate(userId: number, chatId: number): Promise<boolean> {
    return this.chatMembershipService.isUserMemberOfChat(userId, chatId);
  }
}
