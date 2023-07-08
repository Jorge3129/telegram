import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export interface AppEvent<T = any> {
  type: string;
  payload: T;
}

@Injectable()
export class AppEventEmitter<T extends AppEvent = AppEvent> {
  constructor(private eventEmitter: EventEmitter2) {}

  public emit(event: T): void {
    const { type, payload } = event;

    this.eventEmitter.emit(type, payload);
  }
}
