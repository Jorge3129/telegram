import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entity/user.entity';
import { MessageEntity } from '../../messages/entity/message.entity';

@Entity('message_reads')
@Index(['userId', 'messageId'], { unique: true })
export class MessageReadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  messageId: string;

  @ManyToOne(() => MessageEntity, (message) => message.reads)
  message: MessageEntity;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  readAt: string;
}
