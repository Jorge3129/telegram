import {
  ChildEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { ChatUserEntity } from '../../chat-users/entity/chat-user.entity';

export enum ChatType {
  PERSONAL = 'personal',
  GROUP = 'group',
  CHANNEL = 'channel',
}

@Entity('chats')
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export abstract class ChatEntity {
  type: ChatType;

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ChatUserEntity, (ch) => ch.chat)
  members: ChatUserEntity[];
}

@ChildEntity(ChatType.PERSONAL)
export class PersonalChatEntity extends ChatEntity {
  type = ChatType.PERSONAL;
}

@ChildEntity(ChatType.GROUP)
export class GroupChatEntity extends ChatEntity {
  type = ChatType.GROUP;

  @Column()
  title: string;
}

@ChildEntity(ChatType.CHANNEL)
export class ChannelEntity extends ChatEntity {
  type = ChatType.CHANNEL;

  @Column()
  title: string;
}
