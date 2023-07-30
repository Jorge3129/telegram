import { AppTestingModule } from '../../app-testing-module/app-testing-module';
import * as superTestRequest from 'supertest';
import { CreatePollMessageDto } from '../../../../src/messages/dto/create-message/create-poll-message.dto';
import { TestRequest, toTestRequest } from '../../test-request/test-request';
import { CreatePollDto } from '../../../../src/polls/dto/create-poll/create-poll.dto';
import { PollMessage } from '../../../../src/messages/models/message.type';
import { CreateVotesDto } from '../../../../src/polls/dto/create-votes/create-votes.dto';
import { PollVoteEntity } from '../../../../src/polls/entity/poll-vote.entity';

export class PollsTestClient {
  constructor(private readonly testingModule: AppTestingModule) {}

  private get httpServer() {
    return this.testingModule.app.getHttpServer();
  }

  // public async getUserChats(): Promise<ChatForView[]> {
  //   const { body: fetchedChats } = await request(this.httpServer).get('/chats');

  //   return fetchedChats;
  // }

  public vote(
    pollId: string,
    selectedOptionIds: string[],
  ): TestRequest<PollVoteEntity[]> {
    const body: CreateVotesDto = {
      chosenAnswerOptions: selectedOptionIds,
    };

    const res = superTestRequest(this.httpServer)
      .post(`/polls/${pollId}/votes`)
      .send(body);

    return toTestRequest(res);
  }

  public createPollMessage(
    chatId: number,
    pollDto: CreatePollDto,
  ): TestRequest<PollMessage> {
    const pollMessageDto: CreatePollMessageDto = {
      type: 'poll',
      chatId,
      poll: pollDto,
    };

    const res = superTestRequest(this.httpServer)
      .post('/messages')
      .send(pollMessageDto);

    return toTestRequest(res);
  }
}
