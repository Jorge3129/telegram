import { Global, Module } from '@nestjs/common';
import { AppEventEmitter } from './services/app-event-emitter.service';
import { RequirementValidator } from './services/requirements/requirement.validator';

@Global()
@Module({
  providers: [AppEventEmitter, RequirementValidator],
  exports: [AppEventEmitter, RequirementValidator],
})
export class SharedModule {}
