import { AppTestingModule } from '../../app-testing-module/app-testing-module';
import { CreatePollMessageDto } from '../../../../src/messages/dto/create-message/create-poll-message.dto';
import { TestRequest, toTestRequest } from '../../test-request/test-request';
import { CreatePollDto } from '../../../../src/polls/dto/create-poll/create-poll.dto';
import { PollMessage } from '../../../../src/messages/models/message.type';
import { CreateVotesDto } from '../../../../src/polls/dto/create-votes/create-votes.dto';
import { PollVoteEntity } from '../../../../src/polls/entity/poll-vote.entity';
import { BaseTestClient } from '../base-test-client';
import { MakePartial } from '../../types/make-partial.type';
import { PollAnswerOptionWithUsers } from '../../../../src/polls/votes/queries/get-poll-vote-users.query';

export class PollsTestClient extends BaseTestClient {
  constructor(protected readonly testingModule: AppTestingModule) {
    super();
  }

  public vote(
    pollId: string,
    selectedOptionIds: string[],
  ): TestRequest<PollVoteEntity[]> {
    const body: CreateVotesDto = {
      chosenAnswerOptions: selectedOptionIds,
    };

    const res = this.request().post(`/polls/${pollId}/votes`).send(body);

    return toTestRequest(res);
  }

  public getVoteResults(
    pollId: string,
  ): TestRequest<PollAnswerOptionWithUsers[]> {
    const res = this.request().get(`/polls/${pollId}/votes/results`);

    return toTestRequest(res);
  }

  public createPollMessage(
    chatId: number,
    pollDto: MakePartial<
      CreatePollDto,
      'isAnonymous' | 'isMultipleChoice' | 'isQuiz'
    >,
  ): TestRequest<PollMessage> {
    const {
      isAnonymous = false,
      isMultipleChoice = false,
      isQuiz = false,
    } = pollDto;

    const pollMessageDto: CreatePollMessageDto = {
      type: 'poll',
      chatId,
      poll: {
        ...pollDto,
        isAnonymous,
        isMultipleChoice,
        isQuiz,
      },
    };

    const res = this.request().post('/messages').send(pollMessageDto);

    return toTestRequest(res);
  }
}
