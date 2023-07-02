import { IMedia, IMessage, User } from "../types/types";

export const isSelf = (msg: IMessage, user: User | null) =>
  msg && msg.author === user?.username;

export const getMsgById = (
  messageId: string,
  chatId: number,
  messages: IMessage[]
) => {
  return messages
    .filter((msg) => msg.chatId === chatId)
    .find((msg) => msg.id === messageId);
};

export const alreadySeen = (
  timestamp: string,
  unread: number,
  messages: IMessage[]
) => {
  const lastMessageSeen = messages.at(-(unread + 1));
  if (!lastMessageSeen) return false;
  // console.log('from unread: ' + lastMessageSeen.timestamp)
  // console.log('from onFirstRendered: ' + timestamp)
  return new Date(lastMessageSeen.timestamp) >= new Date(timestamp);
};

export const getMediaByType = (media: IMedia, className: string) => {
  const type = media.type.split("/")[0];
  switch (type) {
    case "image":
      return <img className={className} src={media.src} alt={media.filename} />;
    case "video":
      return (
        <video className={className} controls>
          <source src={media.src} type={media.type} />
        </video>
      );
  }
};

export const convertFileToMedia = (file: File): IMedia => {
  return {
    filename: file.name,
    type: file.type,
    src: URL.createObjectURL(file),
  };
};
