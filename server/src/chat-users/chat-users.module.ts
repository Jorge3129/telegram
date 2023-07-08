import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUserEntity } from './entity/chat-user.entity';
import { ChatUserRepository } from './services/chat-user.repository';
import { ChatMembershipService } from './services/chat-membership.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatUserEntity])],
  providers: [ChatUserRepository, ChatMembershipService],
  exports: [ChatUserRepository, ChatMembershipService],
})
export class ChatUsersModule {}
