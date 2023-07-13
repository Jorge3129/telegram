import { Injectable } from '@nestjs/common';
import { ChatMembershipService } from 'src/chat-users/services/chat-membership.service';
import { AppEventEmitter } from 'src/shared/services/app-event-emitter.service';
import { UserEntity } from 'src/users/entity/user.entity';
import { User } from 'src/users/user.type';
import { CreateGifMessageDto } from '../dto/create-message/create-gif-message.dto';
import { AppMessageEvent } from '../events';
import { CreateMessageEvent } from '../events/create-message.event';
import { ReadMessageEvent } from '../events/read-message.event';
import { MessageEntityToModelMapper } from '../mappers/entity-to-model/message-entity-to-model.mapper';
import { Message } from '../models/message.type';
import { CreateMessageService } from './operations/create-message.service';
import { EditMessageService } from './operations/edit-message.service';
import { EditMessageDto } from '../dto/edit-message.dto';
import { DeleteMessageService } from './operations/delete-message-service';
import { DeleteMessageEvent } from '../events/delete-message.event';
import { EditMessageEvent } from '../events/edit-message.event';
import { MessageReadsMutationService } from './message-reads-mutation.service';
import { CreateMessageDto } from '../dto/create-message/create-message.dto';

@Injectable()
export class MessageMutationService {
  constructor(
    private createMessageService: CreateMessageService,
    private editMessageService: EditMessageService,
    private deleteMessageService: DeleteMessageService,
    private membershipService: ChatMembershipService,
    private messageReadsService: MessageReadsMutationService,
    private messageMapper: MessageEntityToModelMapper,
    private eventEmitter: AppEventEmitter<AppMessageEvent>,
  ) {}

  public async create(message: CreateMessageDto, user: User): Promise<Message> {
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

  public async editMessage(
    messageId: string,
    dto: EditMessageDto,
    user: User,
  ): Promise<void> {
    const message = await this.editMessageService.editMessage(
      messageId,
      dto,
      user,
    );

    this.eventEmitter.emit(
      new EditMessageEvent({
        message,
        user,
        editedText: dto.textContent,
      }),
    );
  }

  public async delete(messageId: string, user: User): Promise<void> {
    const message = await this.deleteMessageService.delete(messageId, user);

    this.eventEmitter.emit(new DeleteMessageEvent({ message, user }));
  }

  public async readMessage(message: Message, user: UserEntity): Promise<void> {
    await this.messageReadsService.updateSeen(user.id, message);

    this.eventEmitter.emit(new ReadMessageEvent({ message, user }));
  }
}
