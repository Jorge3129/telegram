import { Injectable } from '@nestjs/common';
import { MessageEntity } from '../../entity/message.entity';
import { EntityManager } from 'typeorm';
import { MessageDtoToEntityMapper } from '../../mappers/dto-to-entity/message-dto-to-entity.mapper';
import { CreateMessageDto } from '../../dto/create-message/create-message.dto';
import { ChatEntity } from '../../../chats/entity/chat.entity';
import { UserRepository } from '../../../users/user.repository';
import { User } from '../../../users/user.type';

@Injectable()
export class CreateMessageService {
  constructor(
    private userRepo: UserRepository,
    private dtoMapper: MessageDtoToEntityMapper,
    private entityManager: EntityManager,
  ) {}

  public async saveFromDto(
    dto: CreateMessageDto,
    user: User,
  ): Promise<MessageEntity> {
    const chat = await this.entityManager.findOneByOrFail(ChatEntity, {
      id: dto.chatId,
    });

    const message = this.dtoMapper.mapDtoToEntity(dto, user, chat);

    const savedMessage = await this.entityManager.transaction(
      async (txManager) => {
        const savedContent = await txManager.save(message.content);

        message.content = savedContent;

        return txManager.save(message);
      },
    );

    savedMessage.author = await this.userRepo.findOneByOrFail({
      id: message.authorId,
    });

    return savedMessage;
  }
}
