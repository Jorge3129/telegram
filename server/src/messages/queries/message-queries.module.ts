import { Provider } from '@nestjs/common';
import { MessageQueryRepository } from './message-query.repository';
import { MessageQueryService } from './message-query.service';

export class MessageQueriesModule {
  public static get providers(): Provider[] {
    return [MessageQueryRepository, MessageQueryService];
  }
}
