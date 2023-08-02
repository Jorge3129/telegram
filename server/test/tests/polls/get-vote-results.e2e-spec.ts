import { HttpStatus } from '@nestjs/common';
import { UserEntity } from '../../../src/users/entity/user.entity';
import { AppTestingModule } from '../../utils/app-testing-module/app-testing-module';
import { testingModuleFactory } from '../../utils/app-testing-module/app-testing-module.factory';
import { ChatsTestClient } from '../../utils/clients/chats/chats.test-client';
import { PollsTestClient } from '../../utils/clients/polls/polls.test-client';
import { mockAuthService } from '../../utils/mocks/mock-auth.service';
import { UserTestClient } from '../../utils/clients/user/user.test-client';
import { runWithOtherUser } from '../../utils/helpers/run-with-other-user';
import { pickPollOptionIds } from '../../utils/clients/polls/pick-poll-options';
import {
  PollAnswerOptionWithUsers,
  PollUserVote,
} from '../../../src/polls/votes/queries/get-poll-vote-users.query';

describe('PollVotesController - get vote results', () => {
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

  it('should successfully get vote results for a poll with multiple choice', async () => {
    const otherChatMember = await userClient.seedUser('other');

    const groupChat = await chatsClient.seedGroupChat('Bloto', [
      currentUser,
      otherChatMember,
    ]);

    const pollMessage = await pollsClient
      .createPollMessage(groupChat.id, {
        question: 'Are you happy?',
        isMultipleChoice: true,
        answerOptions: [{ text: 'Absolutely' }, { text: 'No way :(' }],
      })
      .getBody();

    const createdPoll = pollMessage.poll;

    await runWithOtherUser(otherChatMember.id, async () => {
      const otherMemberOptionIds = pickPollOptionIds(createdPoll, [1]);
      await pollsClient.vote(createdPoll.id, otherMemberOptionIds);
    });

    const currentUserOptionIds = pickPollOptionIds(createdPoll, [0, 1]);
    await pollsClient.vote(createdPoll.id, currentUserOptionIds);

    const results = await pollsClient.getVoteResults(createdPoll.id).getBody();

    expect(results).toMatchObject<PollAnswerOptionWithUsers[]>([
      {
        optionId: createdPoll.answerOptions[0].id,
        votedUsers: [<PollUserVote>{ id: currentUser.id }],
      },
      {
        optionId: createdPoll.answerOptions[1].id,
        votedUsers: [
          <PollUserVote>{ id: currentUser.id },
          <PollUserVote>{ id: otherChatMember.id },
        ],
      },
    ]);
  });

  it('should fail to get vote results for an anonymous poll', async () => {
    const groupChat = await chatsClient.seedGroupChat('Bloto', [currentUser]);

    const pollMessage = await pollsClient
      .createPollMessage(groupChat.id, {
        question: 'Are you happy?',
        isAnonymous: true,
        answerOptions: [{ text: 'Absolutely' }, { text: 'No way :(' }],
      })
      .getBody();

    const createdPoll = pollMessage.poll;

    const currentUserOptionIds = pickPollOptionIds(createdPoll, [0]);
    await pollsClient.vote(createdPoll.id, currentUserOptionIds);

    const errorBody = await pollsClient
      .getVoteResults(createdPoll.id)
      .expect(HttpStatus.FORBIDDEN)
      .getBody();

    expect(errorBody).toMatchObject({
      message: 'Cannot view results of an anonymous poll',
    });
  });

  it('should fail to get vote results without voting in a poll', async () => {
    const groupChat = await chatsClient.seedGroupChat('Bloto', [currentUser]);

    const pollMessage = await pollsClient
      .createPollMessage(groupChat.id, {
        question: 'Are you happy?',
        isAnonymous: false,
        answerOptions: [{ text: 'Absolutely' }, { text: 'No way :(' }],
      })
      .getBody();

    const createdPoll = pollMessage.poll;

    const errorBody = await pollsClient
      .getVoteResults(createdPoll.id)
      .expect(HttpStatus.FORBIDDEN)
      .getBody();

    expect(errorBody).toMatchObject({
      message: 'User has not voted in this poll',
    });
  });

  it('should fail to view results of a poll without being in the chat', async () => {
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

    const errorBody = await pollsClient
      .getVoteResults(createdPoll.id)
      .expect(HttpStatus.FORBIDDEN)
      .getBody();

    expect(errorBody).toMatchObject({
      message: 'User is not member of any chat with this poll',
    });
  });
});
