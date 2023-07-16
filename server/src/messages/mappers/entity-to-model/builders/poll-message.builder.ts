import { Injectable } from '@nestjs/common';
import { PollContentEntity } from 'src/messages/entity/message-content/message-content.entity';
import { MessageEntity } from 'src/messages/entity/message.entity';
import { PollMessage } from 'src/messages/models/message.type';
import { BaseMessageBuilder } from './base-message.builder';
import { PollEntity } from 'src/polls/entity/poll.entity';
import { Poll, PollAnswerOption } from 'src/polls/models/poll.model';
import { PollAnswerOptionEntity } from 'src/polls/entity/poll-answer-option.entity';

@Injectable()
export class PollMessageBuilder {
  constructor(private baseMessageBuilder: BaseMessageBuilder) {}

  public build(
    message: MessageEntity,
    content: PollContentEntity,
  ): PollMessage {
    return {
      type: 'poll-message',
      poll: this.buildPoll(content.poll),
      ...this.baseMessageBuilder.build(message),
    };
  }

  private buildPoll(pollEntity: PollEntity): Poll {
    return {
      id: pollEntity.id,
      question: pollEntity.question,
      isAnonymous: pollEntity.isAnonymous,
      isMultipleChoice: pollEntity.isMultipleChoice,
      isQuiz: pollEntity.isQuiz,
      answerOptions: pollEntity.answerOptions.map((option) =>
        this.buildAnsweOption(option),
      ),
    };
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
