import { Global, Module } from '@nestjs/common';
import { AppEventEmitter } from './services/app-event-emitter.service';

@Global()
@Module({
  providers: [AppEventEmitter],
  exports: [AppEventEmitter],
})
export class SharedModule {}
