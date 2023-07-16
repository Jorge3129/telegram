import { BadRequestException, Injectable } from '@nestjs/common';
import { PollAnswerOptionEntity } from '../../entity/poll-answer-option.entity';
import { RequirementValidator } from '../../../shared/services/requirements/requirement.validator';
import { RequirementConfig } from '../../../shared/services/requirements/requirement-config';
import { PollEntity } from '../../entity/poll.entity';
import * as _ from 'lodash';

@Injectable()
export class CreateVoteRequirement {
  constructor(private validator: RequirementValidator) {}

  public validate(
    answerOptionIds: string[],
    answerOptions: PollAnswerOptionEntity[],
    poll: PollEntity,
  ) {
    const requirements: RequirementConfig[] = [
      {
        check: this.isAnswerListUnique(answerOptionIds),
        err: 'Votes should be unique',
      },
      {
        check: this.isAnswerListExisting(answerOptionIds, answerOptions),
        err: 'Some answer options do not exist',
      },
      {
        check: this.isAnswerListFromTheSamePoll(answerOptions, poll.id),
        err: 'Some votes are in another poll',
      },
      {
        check: this.isMultipleChoiceAllowed(poll, answerOptions),
        err: 'Cannot choose multiple options',
      },
    ];

    return this.validator.validate(
      requirements,
      (message) => new BadRequestException(message),
    );
  }

  private isAnswerListUnique(answerOptionIds: string[]) {
    return _.uniq(answerOptionIds).length === answerOptionIds.length;
  }

  private isAnswerListExisting(
    answerOptionIds: string[],
    answerOptions: PollAnswerOptionEntity[],
  ) {
    return answerOptions.length === answerOptionIds.length;
  }

  private isAnswerListFromTheSamePoll(
    answerOptions: PollAnswerOptionEntity[],
    pollId: string,
  ) {
    return answerOptions.every((option) => option.pollId === pollId);
  }

  private isMultipleChoiceAllowed(
    poll: PollEntity,
    answerOptions: PollAnswerOptionEntity[],
  ) {
    return poll.isMultipleChoice || answerOptions.length <= 1;
  }
}
