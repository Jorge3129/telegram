import { Injectable } from '@nestjs/common';
import { MessagesGateway } from '../messages.gateway';
import {
  DeleteMessageSocketPayload,
  EditMessageSocketPayload,
  MessageSocketEvents,
  NewMessageSocketPayload,
  SeenMessageSocketPayload,
} from '../dtos/message-socket-events';

@Injectable()
export class MessageEventPublisher {
  constructor(private messagesGateway: MessagesGateway) {}

  public async publishNewMessage(
    payload: NewMessageSocketPayload,
    chatId: number,
    userId: number,
  ) {
    await this.messagesGateway.sendMessageToRecipients(
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
    await this.messagesGateway.sendMessageToRecipients(
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
    await this.messagesGateway.sendMessageToRecipients(
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
    this.messagesGateway.emitEventTo(
      authorSocketId,
      MessageSocketEvents.READ,
      payload,
    );
  }
}
