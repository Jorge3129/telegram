import { FC, ReactElement, cloneElement, useState, MouseEvent } from "react";
import "./MessageContextMenu.scss";
import { Menu, MenuItem } from "@mui/material";
import { TextMessage } from "../../models/message.model";
import { useEditMessage } from "../../hooks/message-actions/use-edit-message";
import { useDeleteMessage } from "../../hooks/message-actions/use-delete-message";

interface Props {
  children: ReactElement;
  message: TextMessage;
}

const MessageContextMenu: FC<Props> = ({ children, message }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  const handleRightClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setPosition({
      top: event.clientY - 2,
      left: event.clientX - 4,
    });
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const withClose = (callback: () => void | Promise<void>) => {
    return () => {
      handleClose();
      void callback();
    };
  };

  const handleDelete = useDeleteMessage(message);
  const handleEdit = useEditMessage(message);

  const isOwnMessage = message.isCurrentUserAuthor;

  return (
    <>
      {cloneElement(children, {
        onContextMenu: handleRightClick,
        style: { cursor: "context-menu", userSelect: "none" },
      })}

      <Menu
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={position}
      >
        {isOwnMessage && (
          <MenuItem onClick={withClose(handleEdit)}>Edit</MenuItem>
        )}
        {isOwnMessage && (
          <MenuItem onClick={withClose(handleDelete)}>Delete</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default MessageContextMenu;
