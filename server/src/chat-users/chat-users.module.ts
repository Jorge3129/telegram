import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUserEntity } from './entity/chat-user.entity';
import { ChatUserRepository } from './chat-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatUserEntity])],
  providers: [ChatUserRepository],
  exports: [ChatUserRepository],
})
export class ChatUsersModule {}
