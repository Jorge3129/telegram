import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChatUserEntity } from "../../chat-users/entity/chat-user.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  socketId: string;

  @OneToMany(() => ChatUserEntity, (ch) => ch.user)
  chatMemberships: ChatUserEntity[];
}
