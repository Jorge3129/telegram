import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessagesRepository } from './services/message.repository';
import { Message } from './models/message.type';
import { User } from '../users/user.type';
import { CreateMessageService } from './services/create-message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageReadsService } from './services/message-reads.service';
import { UserEntity } from 'src/users/entity/user.entity';
import { ChatMembershipService } from 'src/chat-users/services/chat-membership.service';
import { AppEventEmitter } from 'src/shared/services/app-event-emitter.service';
import { AppMessageEvent } from './events';
import { CreateMessageEvent } from './events/create-message.event';
import { DeleteMessageEvent } from './events/delete-message.event';
import { ReadMessageEvent } from './events/read-message.event';
import { MessageModelMapper } from './services/mappers/message-model.mapper';
import { CreateGifMessageDto } from './dto/create-gif-message.dto';

@Injectable()
export class MessageService {
  constructor(
    private messageRepo: MessagesRepository,
    private messageReadsService: MessageReadsService,
    private createMessageService: CreateMessageService,
    private membershipService: ChatMembershipService,
    private eventEmitter: AppEventEmitter<AppMessageEvent>,
    private messageMapper: MessageModelMapper,
  ) {}

  public async create(
    message: CreateMessageDto | CreateGifMessageDto,
    user: User,
  ): Promise<Message> {
    await this.membershipService.checkUserChatMembership(
      user.id,
      message.chatId,
    );

    const savedMessage = await this.createMessageService.saveFromDto(
      message,
      user,
    );

    await this.messageReadsService.updateSeen(user.id, message);

    const messageResponse = this.messageMapper.mapEntityToModel(savedMessage);

    this.eventEmitter.emit(
      new CreateMessageEvent({
        message: savedMessage,
        messageResponse,
        user,
      }),
    );

    return messageResponse;
  }

  public async delete(messageId: string, user: User): Promise<void> {
    const message = await this.messageRepo.findOneBy({ id: messageId });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.authorId !== user.id) {
      throw new ForbiddenException('Cannot delete this message');
    }

    await this.messageRepo.delete(messageId);

    this.eventEmitter.emit(new DeleteMessageEvent({ message, user }));
  }

  public async readMessage(message: Message, user: UserEntity): Promise<void> {
    await this.messageReadsService.updateSeen(user.id, message);

    this.eventEmitter.emit(new ReadMessageEvent({ message, user }));
  }

  public async getLatestChatMessage(chatId: number): Promise<Message | null> {
    const message = await this.messageRepo.getLatestMessage(chatId);

    if (!message) {
      return null;
    }

    return this.messageMapper.mapEntityToModel(message);
  }

  public async getMessagesForChat(
    chatId: number,
    user: UserEntity,
  ): Promise<Message[]> {
    await this.membershipService.checkUserChatMembership(user.id, chatId);

    const messages = await this.messageRepo.getMessagesForChat(chatId);

    return messages.map((message) =>
      this.messageMapper.mapEntityToModel(message),
    );
  }
}
