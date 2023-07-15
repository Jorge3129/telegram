import { CSSProperties, FC } from "react";
import "./CustomAvatar.scss";
import { Chat } from "../../../chats/models/chat.model";
import { initials } from "../../utils/format-initials";

interface Props {
  chat?: Chat;
  hide?: boolean;
  title: string;
  prefix: string;
}

const CustomAvatar: FC<Props> = ({ chat, title, prefix, hide }) => {
  const style: CSSProperties = hide ? { visibility: "hidden" } : {};

  return (
    <div className={prefix + "_avatar_wrapper avatar_wrapper"} style={style}>
      <div
        className={
          prefix +
          "_avatar avatar" +
          (chat?.online && prefix === "chat" && chat.type === "personal"
            ? " online"
            : "")
        }
      >
        <div className={prefix + "_avatar_text avatar_text"}>
          {initials(title)}
        </div>
      </div>
    </div>
  );
};

export default CustomAvatar;
