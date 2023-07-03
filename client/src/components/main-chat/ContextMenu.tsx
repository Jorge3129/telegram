import React, { FC } from "react";
import { IContextMenu } from "../../types/types";
import { isSelf } from "../../utils/general.utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user-reducer";
import { Message } from "../../chats/models/message.model";

interface IContextMenuProps {
  contextMenu: IContextMenu;
  msg: Message;
  type: "personal" | "group";
}

const ContextMenu: FC<IContextMenuProps> = ({ contextMenu, msg, type }) => {
  const { user } = useSelector(selectUser);

  const showContextMenu = () => type === "group" && isSelf(msg, user);

  if (!contextMenu || contextMenu.messageId !== msg.id) return <></>;

  return (
    <div
      className="context_menu"
      style={{
        position: "absolute",
        top: contextMenu.x + "",
        left: contextMenu.y + "",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      Menu
      <ul>
        {showContextMenu() &&
          msg.seenBy &&
          msg.seenBy.map((member) => <li key={member}>{member}</li>)}
      </ul>
    </div>
  );
};

export default ContextMenu;
