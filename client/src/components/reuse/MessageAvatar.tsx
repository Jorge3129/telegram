import React, { FC } from "react";
import { Chat, Message } from "../../types/types";
import { isSelf } from "../../utils/general.utils";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user-reducer";

interface IMessageAvatar {
  data: {
    mainChat: Chat | null;
    msg: Message;
    nextMsg: Message;
  };
}

const MessageAvatar: FC<IMessageAvatar> = ({ data }) => {
  const { mainChat, msg, nextMsg } = data;

  const { user } = useSelector(selectUser);

  if (mainChat?.type !== "group" || isSelf(msg, user)) return null;

  return (
    <Avatar
      prefix="message"
      title={msg.author}
      hide={nextMsg && nextMsg.author === msg.author}
    />
  );
};

export default MessageAvatar;
