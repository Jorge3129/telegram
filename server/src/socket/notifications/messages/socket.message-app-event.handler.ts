import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateMessageEventPayload } from 'src/messages/events/create-message.event';
import { DeleteMessageEventPayload } from 'src/messages/events/delete-message.event';
import { EditMessageEventPayload } from 'src/messages/events/edit-message.event';
import { MessageEventType } from 'src/messages/events/message-event-type';
import { ReadMessageEventPayload } from 'src/messages/events/read-message.event';
import { UserService } from 'src/users/user.service';
import { MessageNotificationPublisher } from './message-notification.publisher';

@Injectable()
export class SocketMessageAppEventHandler {
  constructor(
    private userService: UserService,
    private messagePublisher: MessageNotificationPublisher,
  ) {}

  @OnEvent(MessageEventType.CREATE)
  public async handleCreate(payload: CreateMessageEventPayload) {
    const { messageResponse, user } = payload;

    await this.messagePublisher.publishNewMessage(
      { message: messageResponse },
      messageResponse.chatId,
      user.id,
    );
  }

  @OnEvent(MessageEventType.EDIT)
  public async handleEdit(payload: EditMessageEventPayload) {
    const { message, user, editedText } = payload;

    await this.messagePublisher.publishEdit(
      {
        messageId: message.id,
        chatId: message.chatId,
        text: editedText,
      },
      message.chatId,
      user.id,
    );
  }

  @OnEvent(MessageEventType.DELETE)
  public async handleDelete(payload: DeleteMessageEventPayload) {
    const { message, user } = payload;

    await this.messagePublisher.publishDelete(
      { messageId: message.id },
      message.chatId,
      user.id,
    );
  }

  @OnEvent(MessageEventType.READ)
  public async handleRead(payload: ReadMessageEventPayload) {
    const { message, user } = payload;

    const authorSocketId = await this.userService.getUserSocketId(
      message.authorId,
    );

    if (!authorSocketId) {
      return;
    }

    this.messagePublisher.publishMessageRead(
      {
        message,
        userId: user.id,
      },
      authorSocketId,
    );
  }
}
