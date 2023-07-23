import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PollAnswerOptionEntity } from '../../entity/poll-answer-option.entity';
import { RequirementValidator } from '../../../shared/services/requirements/requirement.validator';
import { RequirementConfig } from '../../../shared/services/requirements/requirement-config';
import { PollEntity } from '../../entity/poll.entity';
import * as _ from 'lodash';
import { UserEntity } from 'src/users/entity/user.entity';
import { ChatWithPollMembershipRequirement } from 'src/polls/requirements/chat-with-poll-membership.requirement';
import { UserHasVotedInPollRequirement } from './user-has-voted-in-poll.requirement';

@Injectable()
export class CreateVoteRequirement {
  constructor(
    private validator: RequirementValidator,
    private chatWithPollMembership: ChatWithPollMembershipRequirement,
    private userHasVotedRequirement: UserHasVotedInPollRequirement,
  ) {}

  public validate(
    answerOptionIds: string[],
    answerOptions: PollAnswerOptionEntity[],
    poll: PollEntity,
    currentUser: UserEntity,
  ) {
    const requirements: RequirementConfig[] = [
      ...this.getAccessRequirements(poll, currentUser),
      ...this.getIntegrityRequirements(currentUser.id, poll.id),
      ...this.getValueRequirements(answerOptionIds, answerOptions, poll),
    ];

    return this.validator.validate(
      requirements,
      (message) => new BadRequestException(message),
    );
  }

  private getAccessRequirements(
    poll: PollEntity,
    user: UserEntity,
  ): RequirementConfig[] {
    const requirements: RequirementConfig[] = [
      {
        check: this.chatWithPollMembership.validate(user.id, poll.id),
        errMessage: 'User is not member of any chat with this poll',
      },
    ];

    return requirements.map((config) => ({
      ...config,
      err: (message) => new ForbiddenException(message),
    }));
  }

  private getIntegrityRequirements(
    userId: number,
    pollId: string,
  ): RequirementConfig[] {
    const requirements: RequirementConfig[] = [
      {
        checkNot: this.userHasVotedRequirement.validate(userId, pollId),
        errMessage: 'User has already voted in this poll',
      },
    ];

    return requirements.map((config) => ({
      ...config,
      err: (message) => new ConflictException(message),
    }));
  }

  private getValueRequirements(
    answerOptionIds: string[],
    answerOptions: PollAnswerOptionEntity[],
    poll: PollEntity,
  ): RequirementConfig[] {
    return [
      {
        check: this.isAnswerListUnique(answerOptionIds),
        errMessage: 'Votes should be unique',
      },
      {
        check: this.isAnswerListExisting(answerOptionIds, answerOptions),
        errMessage: 'Some answer options do not exist',
      },
      {
        check: this.isAnswerListFromTheSamePoll(answerOptions, poll.id),
        errMessage: 'Some votes are in another poll',
      },
      {
        check: this.isMultipleChoiceAllowed(poll, answerOptions),
        errMessage: 'Cannot choose multiple options',
      },
    ].map((config) => ({
      ...config,
      err: (message) => new BadRequestException(message),
    }));
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
