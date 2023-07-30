import { HttpStatus } from '@nestjs/common';
import { UserEntity } from '../../../src/users/entity/user.entity';
import { AppTestingModule } from '../../utils/app-testing-module/app-testing-module';
import { testingModuleFactory } from '../../utils/app-testing-module/app-testing-module.factory';
import { ChatsTestClient } from '../../utils/clients/chats/chats.test-client';
import { PollsTestClient } from '../../utils/clients/polls/polls.test-client';
import { mockAuthService } from '../../utils/mocks/mock-auth.service';
import { PollVoteEntity } from '../../../src/polls/entity/poll-vote.entity';

describe('PollVotesController - create votes', () => {
  let testingModule: AppTestingModule;
  let chatsClient: ChatsTestClient;
  let pollsClient: PollsTestClient;

  beforeAll(async () => {
    testingModule = await testingModuleFactory.create();
    chatsClient = new ChatsTestClient(testingModule);
    pollsClient = new PollsTestClient(testingModule);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('should vote in a poll', async () => {
    const em = testingModule.getEntityManager();

    const currentUser = await em.save(
      em.create(UserEntity, {
        username: 'foo',
        password: 'bar',
      }),
    );

    await mockAuthService.login(currentUser.id);

    const groupChat = await chatsClient.seedGroupChat('Bloto', currentUser);

    const pollMessage = await pollsClient
      .createPollMessage(groupChat.id, {
        question: 'Are you happy?',
        isAnonymous: true,
        isMultipleChoice: false,
        isQuiz: false,
        answerOptions: [
          { text: 'Absolutely', isCorrectOption: false },
          { text: 'No way :(', isCorrectOption: false },
        ],
      })
      .expect(HttpStatus.CREATED)
      .getBody();

    const createdPoll = pollMessage.poll;
    const answerOptions = createdPoll.answerOptions;

    expect(createdPoll.answerOptions).toMatchObject([
      { text: 'Absolutely' },
      { text: 'No way :(' },
    ]);

    const selectedAnswerOption = answerOptions[0];

    const createdVotes = await pollsClient
      .vote(createdPoll.id, [selectedAnswerOption.id])
      .expect(HttpStatus.CREATED)
      .getBody();

    expect(createdVotes).toMatchObject([
      <PollVoteEntity>{
        userId: currentUser.id,
        answerOptionId: selectedAnswerOption.id,
      },
    ]);
  });
});
