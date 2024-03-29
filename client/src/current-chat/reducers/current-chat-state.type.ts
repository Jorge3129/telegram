import { Chat } from "../../chats/models/chat.model";
import { Media } from "../../messages/models/media.model";
import { TextMessage } from "../../messages/models/message.model";

export type CreateMessageInputState = {
  type: "create";
};

export type EditMessageInputState = {
  type: "edit";
  message: TextMessage;
};

export type ChatInputState = CreateMessageInputState | EditMessageInputState;

export type CurrentChatState = {
  currentChatId: number | null;
  currentChat: Chat | null;
  inputState: ChatInputState;
  media: Media;
};
