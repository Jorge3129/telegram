import { PrimaryColumn, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { PollAnswerOptionEntity } from './poll-answer-option.entity';
import { UserEntity } from '../../users/entity/user.entity';

@Entity('poll_votes')
export class PollVoteEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  answerOptionId: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => PollAnswerOptionEntity, (answer) => answer.votes)
  answerOption: PollAnswerOptionEntity;

  @CreateDateColumn()
  createdAt: Date;
}
