import { HttpStatus } from '@nestjs/common';
import { UserEntity } from '../../../src/users/entity/user.entity';
import { AppTestingModule } from '../../utils/app-testing-module/app-testing-module';
import { testingModuleFactory } from '../../utils/app-testing-module/app-testing-module.factory';
import { ChatsTestClient } from '../../utils/clients/chats/chats.test-client';
import { PollsTestClient } from '../../utils/clients/polls/polls.test-client';
import { mockAuthService } from '../../utils/mocks/mock-auth.service';
import { PollVoteEntity } from '../../../src/polls/entity/poll-vote.entity';
import { UserTestClient } from '../../utils/clients/user/user.test-client';
import { runWithOtherUser } from '../../utils/helpers/run-with-other-user';
import { pickPollOptionIds } from '../../utils/clients/polls/pick-poll-options';

describe('PollVotesController - create votes', () => {
  let testingModule: AppTestingModule;
  let chatsClient: ChatsTestClient;
  let pollsClient: PollsTestClient;
  let userClient: UserTestClient;
  let currentUser: UserEntity;

  beforeAll(async () => {
    testingModule = await testingModuleFactory.create();
    chatsClient = new ChatsTestClient(testingModule);
    pollsClient = new PollsTestClient(testingModule);
    userClient = new UserTestClient(testingModule);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  beforeEach(async () => {
    currentUser = await userClient.seedUser('foo');

    await mockAuthService.login(currentUser.id);
  });

  it('should successfully vote in a poll with multiple choice', async () => {
    const groupChat = await chatsClient.seedGroupChat('Bloto', [currentUser]);

    const pollMessage = await pollsClient
      .createPollMessage(groupChat.id, {
        question: 'Are you happy?',
        isMultipleChoice: true,
        answerOptions: [{ text: 'Absolutely' }, { text: 'No way :(' }],
      })
      .getBody();

    const createdPoll = pollMessage.poll;
    const selectedAnswerOptionIds = pickPollOptionIds(createdPoll, [0, 1]);

    const createdVotes = await pollsClient
      .vote(createdPoll.id, selectedAnswerOptionIds)
      .expect(HttpStatus.CREATED)
      .getBody();

    expect(createdVotes).toMatchObject(
      selectedAnswerOptionIds.map(
        (optionId) =>
          <PollVoteEntity>{
            userId: currentUser.id,
            answerOptionId: optionId,
          },
      ),
    );
  });

  it('should fail to choose multiple options in a poll with single choice', async () => {
    const groupChat = await chatsClient.seedGroupChat('Bloto', [currentUser]);

    const pollMessage = await pollsClient
      .createPollMessage(groupChat.id, {
        question: 'Are you happy?',
        isMultipleChoice: false,
        answerOptions: [{ text: 'Absolutely' }, { text: 'No way :(' }],
      })
      .getBody();

    const createdPoll = pollMessage.poll;
    const selectedAnswerOptionIds = pickPollOptionIds(createdPoll, [0, 1]);

    const errorBody = await pollsClient
      .vote(createdPoll.id, selectedAnswerOptionIds)
      .expect(HttpStatus.BAD_REQUEST)
      .getBody();

    expect(errorBody).toMatchObject({
      message: 'Cannot choose multiple options',
    });
  });

  it('should fail to vote in a poll twice', async () => {
    const groupChat = await chatsClient.seedGroupChat('Bloto', [currentUser]);

    const pollMessage = await pollsClient
      .createPollMessage(groupChat.id, {
        question: 'Are you happy?',
        answerOptions: [{ text: 'Absolutely' }, { text: 'No way :(' }],
      })
      .getBody();

    const createdPoll = pollMessage.poll;
    const selectedAnswerOption = createdPoll.answerOptions[0];

    await pollsClient
      .vote(createdPoll.id, [selectedAnswerOption.id])
      .expect(HttpStatus.CREATED);

    const errorBody = await pollsClient
      .vote(createdPoll.id, [selectedAnswerOption.id])
      .expect(HttpStatus.CONFLICT)
      .getBody();

    expect(errorBody).toMatchObject({
      message: 'User has already voted in this poll',
    });
  });

  it('should fail to vote in a poll without being in the chat', async () => {
    const pollAuthorUser = await userClient.seedUser('poll-author');

    const groupChat = await chatsClient.seedGroupChat('Bloto', [
      pollAuthorUser,
    ]);

    const createdPoll = await runWithOtherUser(pollAuthorUser.id, async () => {
      const pollMessage = await pollsClient
        .createPollMessage(groupChat.id, {
          question: 'Are you happy?',
          answerOptions: [{ text: 'Absolutely' }, { text: 'No way :(' }],
        })
        .getBody();

      return pollMessage.poll;
    });

    const selectedAnswerOption = createdPoll.answerOptions[0];

    const errorBody = await pollsClient
      .vote(createdPoll.id, [selectedAnswerOption.id])
      .expect(HttpStatus.FORBIDDEN)
      .getBody();

    expect(errorBody).toMatchObject({
      message: 'User is not member of any chat with this poll',
    });
  });
});
