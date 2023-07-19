import { Injectable } from '@nestjs/common';
import { PollContentEntity } from 'src/messages/entity/message-content/message-content.entity';
import { MessageEntity } from 'src/messages/entity/message.entity';
import { PollMessage } from 'src/messages/models/message.type';
import { BaseMessageBuilder } from './base-message.builder';
import { PollEntity } from 'src/polls/entity/poll.entity';
import { Poll, PollAnswerOption } from 'src/polls/models/poll.model';
import { PollAnswerOptionEntity } from 'src/polls/entity/poll-answer-option.entity';
import { EntityManager } from 'typeorm';
import { PollVoteEntity } from 'src/polls/entity/poll-vote.entity';
import { User } from 'src/users/user.type';

@Injectable()
export class PollMessageBuilder {
  constructor(
    private baseMessageBuilder: BaseMessageBuilder,
    private entityManager: EntityManager,
  ) {}

  public async build(
    message: MessageEntity,
    content: PollContentEntity,
    currentUser: User,
  ): Promise<PollMessage> {
    return {
      type: 'poll-message',
      poll: await this.buildPoll(content.poll, currentUser),
      ...this.baseMessageBuilder.build(message),
    };
  }

  private async buildPoll(
    pollEntity: PollEntity,
    currentUser: User,
  ): Promise<Poll> {
    return {
      id: pollEntity.id,
      question: pollEntity.question,
      isAnonymous: pollEntity.isAnonymous,
      isMultipleChoice: pollEntity.isMultipleChoice,
      isQuiz: pollEntity.isQuiz,
      answerOptions: pollEntity.answerOptions.map((option) =>
        this.buildAnsweOption(option),
      ),
      userSelectedOptionIds: await this.getUserVotes(
        pollEntity.id,
        currentUser.id,
      ),
    };
  }

  private async getUserVotes(
    pollId: string,
    userId: number,
  ): Promise<string[]> {
    return this.entityManager
      .find(PollVoteEntity, {
        where: {
          answerOption: {
            pollId: pollId,
          },
          userId: userId,
        },
      })
      .then((votes) => votes.map((vote) => vote.answerOptionId));
  }

  private buildAnsweOption(
    answerEntity: PollAnswerOptionEntity,
  ): PollAnswerOption {
    return {
      id: answerEntity.id,
      optionIndex: answerEntity.optionIndex,
      text: answerEntity.text,
    };
  }
}
