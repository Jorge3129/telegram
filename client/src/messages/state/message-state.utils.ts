import { Poll } from "../../polls/models/poll.model";
import { isPollMessage } from "../models/message.model";
import { MessagesState } from "./messages.reducer";

export const updatePoll = (
  state: MessagesState,
  messageId: string,
  action: (poll: Poll) => void
) => {
  state.messages
    .filter((message) => message.id === messageId)
    .forEach((message) => {
      if (isPollMessage(message)) {
        action(message.poll);
      }
    });
};
