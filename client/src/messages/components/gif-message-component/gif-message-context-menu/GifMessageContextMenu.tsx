import { FC, ReactElement } from "react";
import "./GifMessageContextMenu.scss";
import { GifMessage } from "../../../models/message.model";
import { useOpenDeleteMessageModal } from "../../../hooks/message-actions/use-open-delete-message-modal";
import MessageContextMenu, {
  MessageMenuChildProps,
  MessageMenuOptionConfig,
} from "../../message-context-menu/MessageContextMenu";

interface Props {
  renderChildren: (props: MessageMenuChildProps) => ReactElement;
  message: GifMessage;
}

const GifMessageContextMenu: FC<Props> = ({ renderChildren, message }) => {
  const handleDelete = useOpenDeleteMessageModal(message);

  const isOwnMessage = message.isCurrentUserAuthor;

  const menuOptions: MessageMenuOptionConfig[] = [
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

export default GifMessageContextMenu;
