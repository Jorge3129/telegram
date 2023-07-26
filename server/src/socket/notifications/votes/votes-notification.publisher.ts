import { Injectable } from '@nestjs/common';
import {
  NewVoteSocketPayload,
  VotesSocketEvents,
  RetractVoteSocketPayload,
} from '../../dtos/votes-socket-events';
import { SocketGateway } from '../../socket.gateway';

@Injectable()
export class VotesNotificationPublisher {
  constructor(private messagesGateway: SocketGateway) {}

  public async publishNewVote(
    payload: NewVoteSocketPayload,
    chatId: number,
    userId: number,
  ) {
    await this.messagesGateway.sendMessageToRecipients(
      chatId,
      userId,
      VotesSocketEvents.NEW,
      payload,
    );
  }

  public async publishRetractVote(
    payload: RetractVoteSocketPayload,
    chatId: number,
    userId: number,
  ) {
    await this.messagesGateway.sendMessageToRecipients(
      chatId,
      userId,
      VotesSocketEvents.RETRACT,
      payload,
    );
  }
}
