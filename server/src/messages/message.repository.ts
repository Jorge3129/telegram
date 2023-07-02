import { FindOptionsWhere, Repository } from "typeorm";
import { Message } from "./models/message.type";
import { MessageEntity, PersonalMessageEntity } from "./entity/message.entity";
import dataSource from "../data-source";
import { MessageReadEntity } from "./entity/message-read.entity";
import {
  MediaMessageContentEntity,
  MessageContentEntity,
  TextMessageContentEntity,
} from "./entity/message-content.entity";
import { MediaEntity } from "./entity/media.entity";

export class MessagesRepository {
  constructor(
    private readonly messageRepo: Repository<MessageEntity>,
    private readonly messageReadRepo: Repository<MessageReadEntity>
  ) {}

  public save(dto: Partial<MessageEntity>): Promise<MessageEntity> {
    return this.messageRepo.save({ ...dto });
  }

  public saveFromDto(dto: Message): Promise<MessageEntity> {
    return this.messageRepo.save(this.createMessage(dto));
  }

  private createMessage(dto: Message): MessageEntity {
    const message = new PersonalMessageEntity();
    message.authorId = dto.authorId;
    message.chatId = dto.chatId;
    message.content = this.createMessageContent(dto);
    message.timestamp = dto.timestamp;

    return message;
  }

  private createMessageContent(dto: Message): MessageContentEntity {
    if (!dto.media) {
      const textContent = new TextMessageContentEntity();
      textContent.textContent = dto.text;

      return textContent;
    }

    const media = new MediaEntity();
    media.fileName = dto.media.filename;
    media.mimeType = dto.media.type;

    const mediaContent = new MediaMessageContentEntity();
    mediaContent.media = [media];
    mediaContent.textContent = dto.text;

    return mediaContent;
  }

  public saveMany(dtos: Partial<MessageEntity>[]): Promise<MessageEntity[]> {
    return this.messageRepo.save(dtos.map((dto) => ({ ...dto })));
  }

  public findOneBy(
    where: FindOptionsWhere<MessageEntity>
  ): Promise<MessageEntity | null> {
    return this.messageRepo.findOneBy(where);
  }

  public findBy(
    where: FindOptionsWhere<MessageEntity>
  ): Promise<MessageEntity[]> {
    return this.messageRepo.findBy(where);
  }

  public async updateSeen(
    readByUserId: number,
    message: Message
  ): Promise<void> {
    const messagesToUpdate = await this.messageRepo
      .createQueryBuilder("message")
      .leftJoin(
        MessageReadEntity,
        "readsByUser",
        "readsByUser.messageId = message.id AND readsByUser.userId = :readByUserId",
        { readByUserId }
      )
      .where("message.chatId = :chatId", { chatId: message.chatId })
      .andWhere("message.timestamp <= :timestamp", {
        timestamp: message.timestamp,
      })
      .andWhere("readsByUser IS NULL")
      .select(`message.id AS "messageId"`)
      .getRawMany<{ messageId: string }>();

    const values = messagesToUpdate.map(
      ({ messageId }): Partial<MessageReadEntity> => ({
        messageId,
        userId: readByUserId,
      })
    );

    await this.messageReadRepo.save(values);
  }
}

export const messagesRepo = new MessagesRepository(
  dataSource.getRepository(MessageEntity),
  dataSource.getRepository(MessageReadEntity)
);
