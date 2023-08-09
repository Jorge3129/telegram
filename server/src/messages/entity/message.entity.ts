import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { UserEntity } from '../../users/entity/user.entity';
import { ChatEntity } from '../../chats/entity/chat.entity';
import { MessageContentEntity } from './message-content/message-content.entity';
import { MessageReadEntity } from '../../message-reads/entity/message-read.entity';

export enum MessageType {
  PERSONAL_MESSAGE = 'personal-message',
  GROUP_MESSAGE = 'group-message',
  CHANNEL_POST = 'channel-post',
}

@Entity('messages')
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export abstract class MessageEntity {
  type: MessageType;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp with time zone' })
  timestamp: string;

  @Column({ default: false })
  edited: boolean;

  @Column()
  authorId: number;

  @ManyToOne(() => UserEntity, { eager: true })
  author: UserEntity;

  @Column()
  chatId: number;

  @ManyToOne(() => ChatEntity)
  chat: ChatEntity;

  @OneToOne(() => MessageContentEntity, (c) => c.message, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  content: MessageContentEntity;

  @OneToMany(() => MessageReadEntity, (read) => read.message, {
    onDelete: 'CASCADE',
  })
  reads: MessageReadEntity[];
}

@ChildEntity(MessageType.PERSONAL_MESSAGE)
export class PersonalMessageEntity extends MessageEntity {
  readonly type = MessageType.PERSONAL_MESSAGE;
}

@ChildEntity(MessageType.GROUP_MESSAGE)
export class GroupMessageEntity extends MessageEntity {
  readonly type = MessageType.GROUP_MESSAGE;
}

@ChildEntity(MessageType.CHANNEL_POST)
export class ChannelPostEntity extends MessageEntity {
  readonly type = MessageType.CHANNEL_POST;
}
