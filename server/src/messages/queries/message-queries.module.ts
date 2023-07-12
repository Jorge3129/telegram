import { Provider } from '@nestjs/common';
import { MessageQueryRepository } from './message-query.repository';
import { MessageQueryService } from './message-query.service';
import { MessageReadsQueryService } from './message-reads-query.service';

export class MessageQueriesModule {
  public static get providers(): Provider[] {
    return [
      MessageQueryRepository,
      MessageQueryService,
      MessageReadsQueryService,
    ];
  }
}
