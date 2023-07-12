import {
  ChildEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { MediaEntity } from './media.entity';
import { MessageEntity } from './message.entity';

export enum MessageContentType {
  TEXT_MESSAGE = 'text-message',
  MEDIA_MESSAGE = 'media-message',
  GIF_MESSAGE = 'gif-message',
}

@Entity('message_contents')
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export abstract class MessageContentEntity {
  readonly type: MessageContentType;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => MessageEntity, (m) => m.content)
  message: MessageEntity;
}

@ChildEntity('text')
export class TextMessageContentEntity extends MessageContentEntity {
  readonly type = MessageContentType.TEXT_MESSAGE;

  @Column({ type: 'text' })
  textContent: string;
}

@ChildEntity('media')
export class MediaMessageContentEntity extends MessageContentEntity {
  readonly type = MessageContentType.MEDIA_MESSAGE;

  @Column({ type: 'text', nullable: true })
  textContent?: string;

  @OneToMany(() => MediaEntity, (media) => media.messageContent, {
    eager: true,
    cascade: true,
  })
  media: MediaEntity[];
}

@ChildEntity('gif')
export class GifContentEntity extends MessageContentEntity {
  readonly type = MessageContentType.GIF_MESSAGE;

  @Column({ type: 'jsonb' })
  srcObject: object;
}

export const isTextContent = (
  value: MessageContentEntity,
): value is TextMessageContentEntity =>
  value.type === MessageContentType.TEXT_MESSAGE;

export const isMediaContent = (
  value: MessageContentEntity,
): value is MediaMessageContentEntity =>
  value.type === MessageContentType.MEDIA_MESSAGE;

export const isGifContent = (
  value: MessageContentEntity,
): value is GifContentEntity => value.type === MessageContentType.GIF_MESSAGE;

export type UnionMessageContentEntity =
  | TextMessageContentEntity
  | MediaMessageContentEntity
  | GifContentEntity;
