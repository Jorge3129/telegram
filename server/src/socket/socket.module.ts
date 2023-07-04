import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [MessagesModule],
})
export class SocketModule {}
