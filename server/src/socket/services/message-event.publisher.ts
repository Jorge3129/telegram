import { Injectable } from '@nestjs/common';
import { MessagesGateway } from '../messages.gateway';
import { OnEvent } from '@nestjs/event-emitter';
import { MessageEventType } from 'src/messages/events/message-event-type';
import { CreateMessageEventPayload } from 'src/messages/events/create-message.event';
import { EditMessageEventPayload } from 'src/messages/events/edit-message.event';
import { DeleteMessageEventPayload } from 'src/messages/events/delete-message.event';
import { ReadMessageEventPayload } from 'src/messages/events/read-message.event';
import { UserService } from 'src/users/user.service';

@Injectable()
export class MessageEventPublisher {
  constructor(
    private messagesGateway: MessagesGateway,
    private userService: UserService,
  ) {}

  @OnEvent(MessageEventType.CREATE)
  public async handleCreate(payload: CreateMessageEventPayload) {
    const { messageResponse, user } = payload;

    await this.messagesGateway.sendMessageToRecipients(
      messageResponse.chatId,
      user.id,
      'message-to-client',
      messageResponse,
    );
  }

  @OnEvent(MessageEventType.EDIT)
  public async handleEdit(payload: EditMessageEventPayload) {
    const { message, user, editedText } = payload;

    await this.messagesGateway.sendMessageToRecipients(
      message.chatId,
      user.id,
      'message-edit',
      {
        messageId: message.id,
        chatId: message.chatId,
        text: editedText,
      },
    );
  }

  @OnEvent(MessageEventType.DELETE)
  public async handleDelete(payload: DeleteMessageEventPayload) {
    const { message, user } = payload;

    await this.messagesGateway.sendMessageToRecipients(
      message.chatId,
      user.id,
      'message-deleted',
      message.id,
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

    this.messagesGateway.emitEventTo(authorSocketId, 'seen', {
      message,
      userId: user.id,
    });
  }
}
