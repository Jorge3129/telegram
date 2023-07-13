import { Injectable } from '@nestjs/common';
import { MessageEntity } from '../../entity/message.entity';
import { UserRepository } from 'src/users/user.repository';
import { EntityManager } from 'typeorm';
import { User } from 'src/users/user.type';
import { MessageDtoToEntityMapper } from '../../mappers/dto-to-entity/message-dto-to-entity.mapper';
import { CreateMessageDto } from '../../dto/create-message/create-message.dto';

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
    const message = this.dtoMapper.mapDtoToEntity(dto, user);

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
