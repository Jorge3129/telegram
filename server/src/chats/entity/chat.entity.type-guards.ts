import {
  ChatEntity,
  PersonalChatEntity,
  ChatType,
  GroupChatEntity,
  ChannelEntity,
} from './chat.entity';

export const isPersonalChat = (
  chat: ChatEntity,
): chat is PersonalChatEntity => {
  return chat.type === ChatType.PERSONAL;
};

export const isGroupChat = (chat: ChatEntity): chat is GroupChatEntity => {
  return chat.type === ChatType.GROUP;
};

export const isChannel = (chat: ChatEntity): chat is ChannelEntity => {
  return chat.type === ChatType.CHANNEL;
};
