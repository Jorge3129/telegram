import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RequirementConfig } from '../../shared/services/requirements/requirement-config';
import { RequirementValidator } from '../../shared/services/requirements/requirement.validator';
import { UserEntity } from '../../users/entity/user.entity';
import { ChatMembershipRequirement } from '../../chat-users/requirements/chat-membership.requirement';
import { ChatEntity } from '../../chats/entity/chat.entity';

@Injectable()
export class CreateMessageRequirement {
  constructor(
    private validator: RequirementValidator,
    private chatMembership: ChatMembershipRequirement,
  ) {}

  public validate(chat: ChatEntity, currentUser: UserEntity) {
    const requirements: RequirementConfig[] = [
      ...this.getAccessRequirements(currentUser.id, chat.id),
    ];

    return this.validator.validate(
      requirements,
      (message) => new BadRequestException(message),
    );
  }

  private getAccessRequirements(
    userId: number,
    chatId: number,
  ): RequirementConfig[] {
    const requirements: RequirementConfig[] = [
      {
        check: () => this.chatMembership.validate(userId, chatId),
        errMessage: 'User is not member this chat',
      },
    ];

    return requirements.map((config) => ({
      ...config,
      err: (message) => new ForbiddenException(message),
    }));
  }
}
