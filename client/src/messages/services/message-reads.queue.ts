import { Message } from "../models/message.model";
import { BehaviorSubject, Subscription, bufferTime, filter, map } from "rxjs";
import { isNotNullable } from "../../shared/utils/is-not-null";
import _ from "lodash";
import { messageApiService } from "../messages-api.service";
import { findLatestMessage } from "../utils/find-latest-message";

export class MessageReadsQueue {
  private readonly messageReads$ = new BehaviorSubject<Message | null>(null);

  private sub: Subscription | null = null;

  public emitMessageRead(message: Message): void {
    this.messageReads$.next(message);
  }

  public init(): void {
    const result$ = this.messageReads$.pipe(
      filter(isNotNullable),
      bufferTime(1000),
      map((messages) => {
        const uniqueMessages = _.uniqBy(messages, (m) => m.id);

        const latestMessage = findLatestMessage(uniqueMessages);

        return latestMessage;
      }),
      filter(isNotNullable)
    );

    this.sub = result$.subscribe((message) => {
      void messageApiService.updateMessageReads(message.id);
    });
  }

  public destroy() {
    this.sub?.unsubscribe();
  }
}
