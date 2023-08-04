import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity } from '../users/entity/user.entity';
import { MessageEntity } from '../messages/entity/message.entity';
import { ReadMessageEvent } from '../messages/events/read-message.event';
import { MessageReadsMutationService } from './mutations/message-reads-mutation.service';
import { AppEventEmitter } from '../shared/services/app-event-emitter.service';

@Injectable()
export class MessageReadsService {
  constructor(
    private entityManager: EntityManager,
    private messageReadsService: MessageReadsMutationService,
    private eventEmitter: AppEventEmitter,
  ) {}

  public async readMessage(messageId: string, user: UserEntity): Promise<void> {
    const message = await this.entityManager.findOneByOrFail(MessageEntity, {
      id: messageId,
    });

    await this.messageReadsService.updateSeen(user.id, message);

    this.eventEmitter.emit(new ReadMessageEvent({ message, user }));
  }
}
