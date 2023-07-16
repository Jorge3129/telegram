import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PollEntity } from './poll.entity';
import { PollVoteEntity } from './poll-vote.entity';

@Entity('poll_answer_options')
export class PollAnswerOptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({ nullable: true })
  isCorrectOption?: boolean;

  @Column({ type: 'int' })
  optionIndex: number;

  @Column()
  pollId: string;

  @ManyToOne(() => PollEntity, (poll) => poll.answerOptions)
  poll: PollEntity;

  @OneToMany(() => PollVoteEntity, (vote) => vote.answerOption)
  votes: PollVoteEntity[];
}
