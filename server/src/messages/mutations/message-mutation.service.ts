import { Injectable } from '@nestjs/common';
import { AppMessageEvent } from '../events';
import { CreateMessageEvent } from '../events/create-message.event';
import { MessageEntityToModelMapper } from '../mappers/entity-to-model/message-entity-to-model.mapper';
import { Message } from '../models/message.type';
import { CreateMessageService } from './operations/create-message.service';
import { EditMessageService } from './operations/edit-message.service';
import { EditMessageDto } from '../dto/edit-message.dto';
import { DeleteMessageService } from './operations/delete-message-service';
import { DeleteMessageEvent } from '../events/delete-message.event';
import { EditMessageEvent } from '../events/edit-message.event';
import { MessageReadsMutationService } from '../../message-reads/mutations/message-reads-mutation.service';
import { CreateMessageDto } from '../dto/create-message/create-message.dto';
import { AppEventEmitter } from '../../shared/services/app-event-emitter.service';
import { UserEntity } from '../../users/entity/user.entity';

@Injectable()
export class MessageMutationService {
  constructor(
    private createMessageService: CreateMessageService,
    private editMessageService: EditMessageService,
    private deleteMessageService: DeleteMessageService,
    private messageReadsService: MessageReadsMutationService,
    private messageMapper: MessageEntityToModelMapper,
    private eventEmitter: AppEventEmitter<AppMessageEvent>,
  ) {}

  public async create(
    message: CreateMessageDto,
    user: UserEntity,
  ): Promise<Message> {
    const savedMessage = await this.createMessageService.saveFromDto(
      message,
      user,
    );

    await this.messageReadsService.updateSeen(user.id, savedMessage);

    const messageResponse = await this.messageMapper.mapEntityToModel(
      savedMessage,
      user,
    );

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
    user: UserEntity,
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

  public async delete(messageId: string, user: UserEntity): Promise<void> {
    const message = await this.deleteMessageService.delete(messageId, user);

    this.eventEmitter.emit(new DeleteMessageEvent({ message, user }));
  }
}
