import { Injectable } from '@nestjs/common';
import {
  NewVoteSocketPayload,
  RetractVoteSocketPayload,
  VotesSocketEvents,
} from 'src/socket/dtos/votes-socket-events';
import { SocketGateway } from 'src/socket/socket.gateway';

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
