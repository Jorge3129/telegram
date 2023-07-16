import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { PollAnswerOptionEntity } from './poll-answer-option.entity';
import { UserEntity } from '../../users/entity/user.entity';

@Entity('poll_votes')
export class PollVoteEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  answerOptionId: string;

  @ManyToOne(() => PollAnswerOptionEntity)
  user: UserEntity;

  @ManyToOne(() => PollAnswerOptionEntity, (answer) => answer.votes)
  answerOption: PollAnswerOptionEntity;

  @CreateDateColumn()
  createdAt: Date;
}
