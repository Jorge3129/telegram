import {
  ChildEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

export enum ChatType {
  PERSONAL = "personal",
  GROUP = "group",
  CHANNEL = "channel",
}

@Entity("chats")
@TableInheritance({ column: { name: "type", type: "varchar" } })
export abstract class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  type: ChatType;
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
