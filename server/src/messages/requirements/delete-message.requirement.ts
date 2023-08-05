import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RequirementConfig } from '../../shared/services/requirements/requirement-config';
import { RequirementValidator } from '../../shared/services/requirements/requirement.validator';
import { UserEntity } from '../../users/entity/user.entity';
import { ChatMembershipRequirement } from '../../chat-users/requirements/chat-membership.requirement';
import { MessageEntity } from '../entity/message.entity';
import { MessageAuthorRequirement } from './message-author.requirement';

@Injectable()
export class DeleteMessageRequirement {
  constructor(
    private validator: RequirementValidator,
    private chatMembership: ChatMembershipRequirement,
    private messageAuthorRequirement: MessageAuthorRequirement,
  ) {}

  public validate(message: MessageEntity, currentUser: UserEntity) {
    const requirements: RequirementConfig[] = [
      ...this.getAccessRequirements(currentUser.id, message),
    ];

    return this.validator.validate(
      requirements,
      (message) => new BadRequestException(message),
    );
  }

  private getAccessRequirements(
    userId: number,
    message: MessageEntity,
  ): RequirementConfig[] {
    const requirements: RequirementConfig[] = [
      {
        check: () => this.chatMembership.validate(userId, message.chatId),
        errMessage: 'User is not member of the chat',
      },
      {
        check: () => this.messageAuthorRequirement.validate(userId, message),
        errMessage: 'User is not author of this message',
      },
    ];

    return requirements.map((config) => ({
      ...config,
      err: (message) => new ForbiddenException(message),
    }));
  }
}
