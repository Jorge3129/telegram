import { Injectable } from '@nestjs/common';
import {
  NewMessageSocketPayload,
  MessageSocketEvents,
  EditMessageSocketPayload,
  DeleteMessageSocketPayload,
  SeenMessageSocketPayload,
} from '../../dtos/message-socket-events';
import { SocketGateway } from '../../socket.gateway';

@Injectable()
export class MessageNotificationPublisher {
  constructor(private socketGateway: SocketGateway) {}

  public async publishNewMessage(
    payload: NewMessageSocketPayload,
    chatId: number,
    userId: number,
  ) {
    await this.socketGateway.sendMessageToRecipients(
      chatId,
      userId,
      MessageSocketEvents.NEW,
      payload,
    );
  }

  public async publishEdit(
    payload: EditMessageSocketPayload,
    chatId: number,
    userId: number,
  ) {
    await this.socketGateway.sendMessageToRecipients(
      chatId,
      userId,
      MessageSocketEvents.EDIT,
      payload,
    );
  }

  public async publishDelete(
    payload: DeleteMessageSocketPayload,
    chatId: number,
    userId: number,
  ) {
    await this.socketGateway.sendMessageToRecipients(
      chatId,
      userId,
      MessageSocketEvents.DELETE,
      payload,
    );
  }

  public async publishMessageRead(
    payload: SeenMessageSocketPayload,
    authorSocketId: string,
  ) {
    this.socketGateway.emitEventTo(
      authorSocketId,
      MessageSocketEvents.READ,
      payload,
    );
  }
}
