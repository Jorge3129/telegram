import { FC } from "react";
import "./ChatAvatar.scss";
import { Chat, ChatType } from "../../models/chat.model";
import { initials } from "../../../shared/utils/format-initials";
import { classIf } from "../../../utils/class-if";

interface Props {
  chat?: Chat;
  title: string;
}

const ChatAvatar: FC<Props> = ({ chat, title }) => {
  return (
    <div className={"chat_avatar_wrapper avatar_wrapper"}>
      <div
        className={
          "chat_avatar avatar" +
          classIf(!!chat?.online && chat.type === ChatType.PERSONAL, "online")
        }
      >
        <div className={"chat_avatar_text avatar_text"}>{initials(title)}</div>
      </div>
    </div>
  );
};

export default ChatAvatar;
