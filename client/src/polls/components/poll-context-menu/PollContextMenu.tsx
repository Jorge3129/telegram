import { FC, ReactElement } from "react";
import "./PollContextMenu.scss";
import { Poll } from "../../models/poll.model";
import { PollMessage } from "../../../messages/models/message.model";
import { useOpenDeleteMessageModal } from "../../../messages/hooks/message-actions/use-open-delete-message-modal";
import { useRetractVote } from "../../hooks/poll-actions/use-retract-vote";
import MessageContextMenu, {
  MessageMenuChildProps,
  MessageMenuOptionConfig,
} from "../../../messages/components/message-context-menu/MessageContextMenu";

interface Props {
  renderChildren: (props: MessageMenuChildProps) => ReactElement;
  message: PollMessage;
  poll: Poll;
}

const PollContextMenu: FC<Props> = ({ renderChildren, message, poll }) => {
  const handleDelete = useOpenDeleteMessageModal(message);
  const handleRetractVote = useRetractVote(poll, message);

  const isOwnMessage = message.isCurrentUserAuthor;

  const userHasVoted = !!poll.userSelectedOptionIds.length;

  const menuOptions: MessageMenuOptionConfig[] = [
    {
      text: "Retract vote",
      enabled: userHasVoted && !poll.isQuiz,
      handler: handleRetractVote,
      icon: <i className="fa-solid fa-arrow-rotate-left"></i>,
    },
    {
      text: "Delete",
      enabled: isOwnMessage,
      handler: handleDelete,
      icon: <i className="fa-solid fa-trash"></i>,
    },
  ];

  return (
    <MessageContextMenu
      menuOptions={menuOptions}
      renderChildren={renderChildren}
    />
  );
};

export default PollContextMenu;
