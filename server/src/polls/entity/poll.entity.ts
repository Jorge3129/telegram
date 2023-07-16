import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PollAnswerOptionEntity } from './poll-answer-option.entity';

@Entity('polls')
export class PollEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column({ default: true })
  isAnonymous: boolean;

  @Column({ default: false })
  isMultipleChoice: boolean;

  @Column({ default: false })
  isQuiz: boolean;

  @OneToMany(() => PollAnswerOptionEntity, (answer) => answer.poll, {
    eager: true,
    cascade: true,
  })
  answerOptions: PollAnswerOptionEntity[];
}
