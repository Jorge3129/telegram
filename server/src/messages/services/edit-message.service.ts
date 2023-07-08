import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessagesRepository } from './message.repository';
import { EditMessageDto } from '../dto/edit-message.dto';
import { User } from 'src/users/user.type';
import { AppEventEmitter } from 'src/shared/services/app-event-emitter.service';
import { AppMessageEvent } from '../events';
import { EditMessageEvent } from '../events/edit-message.event';

@Injectable()
export class EditMessageService {
  constructor(
    private messageRepo: MessagesRepository,
    private eventEmitter: AppEventEmitter<AppMessageEvent>,
  ) {}

  public async editMessage(
    messageId: string,
    dto: EditMessageDto,
    user: User,
  ): Promise<void> {
    const message = await this.messageRepo.findOneBy({ id: messageId });

    if (!message) {
      throw new NotFoundException('No message');
    }

    if (message.author.id !== user.id) {
      throw new ForbiddenException('Cannot edit this message');
    }

    await this.messageRepo.updateMessageText(message, dto.textContent);

    this.eventEmitter.emit(
      new EditMessageEvent({
        message,
        user,
        editedText: dto.textContent,
      }),
    );
  }
}
