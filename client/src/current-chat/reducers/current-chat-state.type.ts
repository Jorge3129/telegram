import { Chat } from "../../chats/models/chat.model";
import { Message, Media } from "../../messages/models/message.model";

export type CreateMessageInputState = {
  type: "create";
};

export type EditMessageInputState = {
  type: "edit";
  message: Message;
};

export type ChatInputState = CreateMessageInputState | EditMessageInputState;

export type CurrentChatState = {
  currentChatId: number | null;
  currentChat: Chat | null;
  inputState: ChatInputState;
  media: Media;
};
