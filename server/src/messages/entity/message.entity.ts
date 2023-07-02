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
} from "typeorm";
import { UserEntity } from "../../users/entity/user.entity";
import { ChatEntity } from "../../chats/entity/chat.entity";
import { MessageContentEntity } from "./message-content.entity";
import { MessageReadEntity } from "./message-read.entity";

export enum MessageType {
  PERSONAL_MESSAGE = "personal-message",
  GROUP_MESSAGE = "group-message",
  CHANNEL_POST = "channel-post",
}

@Entity("messages")
@TableInheritance({ column: { name: "type", type: "varchar" } })
export abstract class MessageEntity {
  type: MessageType;

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "timestamp" })
  timestamp: string;

  @Column()
  authorId: number;

  @ManyToOne(() => UserEntity)
  author: UserEntity;

  @Column()
  chatId: number;

  @ManyToOne(() => ChatEntity)
  chat: ChatEntity;

  @OneToOne(() => MessageContentEntity, (c) => c.message, { eager: true })
  @JoinColumn()
  content: MessageContentEntity;

  @OneToMany(() => MessageReadEntity, (read) => read.message)
  reads: MessageReadEntity[];
}

@ChildEntity(MessageType.PERSONAL_MESSAGE)
export class PersonalMessageEntity extends MessageEntity {
  type = MessageType.PERSONAL_MESSAGE;
}

@ChildEntity(MessageType.GROUP_MESSAGE)
export class GroupMessageEntity extends MessageEntity {
  type = MessageType.GROUP_MESSAGE;
}

@ChildEntity(MessageType.CHANNEL_POST)
export class ChannelPostEntity extends MessageEntity {
  type = MessageType.CHANNEL_POST;
}
