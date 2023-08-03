import { FC, ReactElement } from "react";
import "./TextMessageContextMenu.scss";
import { TextMessage } from "../../../models/message.model";
import { useEditMessage } from "../../../hooks/message-actions/use-edit-message";
import { useOpenDeleteMessageModal } from "../../../hooks/message-actions/use-open-delete-message-modal";
import MessageContextMenu, {
  MessageMenuChildProps,
  MessageMenuOptionConfig,
} from "../../message-context-menu/MessageContextMenu";

interface Props {
  renderChildren: (props: MessageMenuChildProps) => ReactElement;
  message: TextMessage;
}

const TextMessageContextMenu: FC<Props> = ({ renderChildren, message }) => {
  const handleDelete = useOpenDeleteMessageModal(message);
  const handleEdit = useEditMessage(message);

  const isOwnMessage = message.isCurrentUserAuthor;

  const menuOptions: MessageMenuOptionConfig[] = [
    {
      text: "Edit",
      enabled: isOwnMessage,
      handler: handleEdit,
      icon: <i className="fa-solid fa-pen"></i>,
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

export default TextMessageContextMenu;
