import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entity/user.entity";
import { MessageEntity } from "./message.entity";

@Entity("message_reads")
export class MessageReadEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  messageId: string;

  @ManyToOne(() => MessageEntity, (message) => message.reads)
  message: MessageEntity;

  @Column({ type: "timestamp" })
  readAt: string;
}
