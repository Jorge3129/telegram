import {
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { MediaEntity } from '../media.entity';
import { MessageEntity } from '../message.entity';
import { MessageContentType } from './message-content-type';
import { PollEntity } from '../../../polls/entity/poll.entity';

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

@ChildEntity('poll')
export class PollContentEntity extends MessageContentEntity {
  readonly type = MessageContentType.POLL_MESSAGE;

  @Column()
  pollId: string;

  @ManyToOne(() => PollEntity, {
    eager: true,
    cascade: true,
  })
  poll: PollEntity;
}

export type UnionMessageContentEntity =
  | TextMessageContentEntity
  | MediaMessageContentEntity
  | GifContentEntity
  | PollContentEntity;
