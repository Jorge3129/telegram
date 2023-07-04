import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "../../users/entity/user.entity";
import { ChatEntity } from "../../chats/entity/chat.entity";

@Entity("chat_users")
export class ChatUserEntity {
  @PrimaryColumn({ type: "int", name: "userId" })
  userId: number;

  @PrimaryColumn({ type: "int", name: "chatId" })
  chatId: number;

  @ManyToOne(() => UserEntity, (user) => user.chatMemberships)
  user: UserEntity;

  @ManyToOne(() => ChatEntity, (chat) => chat.members)
  chat: ChatEntity;

  @Column({ type: "timestamp" })
  lastRead: string;

  @Column()
  muted: boolean;
}
