import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUserEntity } from './entity/chat-user.entity';
import { ChatUserRepository } from './services/chat-user.repository';
import { ChatMembershipService } from './services/chat-membership.service';
import { ChatMembershipRequirement } from './requirements/chat-membership.requirement';

@Module({
  imports: [TypeOrmModule.forFeature([ChatUserEntity])],
  providers: [
    ChatUserRepository,
    ChatMembershipService,
    ChatMembershipRequirement,
  ],
  exports: [
    ChatUserRepository,
    ChatMembershipService,
    ChatMembershipRequirement,
  ],
})
export class ChatUsersModule {}
