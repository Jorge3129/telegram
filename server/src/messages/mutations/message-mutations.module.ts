import { Provider } from '@nestjs/common';
import { CreateMessageService } from './operations/create-message.service';
import { EditMessageService } from './operations/edit-message.service';
import { DeleteMessageService } from './operations/delete-message-service';
import { MessageMutationRepository } from './message-mutation.repository';
import { MessageMutationService } from './message-mutation.service';
import { MessageReadsMutationService } from './message-reads-mutation.service';

export class MessageMutationsModule {
  public static get providers(): Provider[] {
    return [
      CreateMessageService,
      EditMessageService,
      DeleteMessageService,
      MessageMutationRepository,
      MessageMutationService,
      MessageReadsMutationService,
    ];
  }
}
