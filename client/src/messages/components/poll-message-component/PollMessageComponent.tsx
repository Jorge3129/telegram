import { FC, useEffect } from "react";
import "./PollMessageComponent.scss";
import { PollMessage } from "../../models/message.model";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/user-reducer";
import MessageTimestamp from "../../../ui/message/MessageTimestamp";
import MessageStatusWrapper from "../../../ui/message/message-status/MessageStatusWrapper";
import { classIf } from "../../../utils/class-if";
import { isOwnMessage } from "../../../utils/is-own-message";
import MessageContextMenu from "../message-context-menu/MessageContextMenu";

interface Props {
  message: PollMessage;
  callback: null | (() => void);
  chatType: "personal" | "group";
}

const PollMessageComponent: FC<Props> = ({ message, chatType, callback }) => {
  useEffect(() => {
    if (callback && !message.seen) {
      callback();
    }
  }, []);

  const { user } = useSelector(selectUser);

  const isOwn = isOwnMessage(message, user);

  const showAuthor = chatType === "group" && !isOwn;

  return (
    <MessageContextMenu message={message}>
      <div
        className={
          "message_item poll_message_item" + classIf(isOwn, "own_message")
        }
      >
        <div className="message_author">{showAuthor && message.authorName}</div>

        <div className="message_text">{message.poll.question}</div>

        <div className="message_info">
          <MessageTimestamp timestamp={message.timestamp} />
          <MessageStatusWrapper message={message} currentUser={user} />
        </div>

        <div className="clearfix"></div>
      </div>
    </MessageContextMenu>
  );
};

export default PollMessageComponent;
