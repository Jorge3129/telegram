import { FC, useEffect } from "react";
import "./PollMessageComponent.scss";
import { PollMessage } from "../../models/message.model";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/user-reducer";
import MessageTimestamp from "../../../ui/message/MessageTimestamp";
import MessageStatusWrapper from "../../../ui/message/message-status/MessageStatusWrapper";
import { classIf } from "../../../utils/class-if";
import { isOwnMessage } from "../../../utils/is-own-message";
import PollComponent from "../../../polls/components/poll-component/PollComponent";
import PollContextMenu from "../../../polls/components/poll-context-menu/PollContextMenu";

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
    <PollContextMenu poll={message.poll} message={message}>
      <div className={"poll_message_item" + classIf(isOwn, "own_message")}>
        <div className="message_author">{showAuthor && message.authorName}</div>

        <div className="message_text">
          <PollComponent
            poll={message.poll}
            isOwnMessage={isOwn}
            message={message}
          />
        </div>

        <div className="message_info">
          <MessageTimestamp timestamp={message.timestamp} />
          <MessageStatusWrapper message={message} currentUser={user} />
        </div>
      </div>
    </PollContextMenu>
  );
};

export default PollMessageComponent;
