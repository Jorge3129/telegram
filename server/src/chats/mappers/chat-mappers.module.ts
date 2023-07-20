import { Provider } from '@nestjs/common';
import { ChatEntityForViewMapper } from './entity-for-view/chat.entity-for-view.mapper';

export class ChatMappersModule {
  public static get providers(): Provider[] {
    return [ChatEntityForViewMapper];
  }
}
