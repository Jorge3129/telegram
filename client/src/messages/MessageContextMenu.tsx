import { FC, useState, MouseEvent, ReactElement, cloneElement } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Message } from "./models/message.model";
import { messageApiService } from "./messages-api.service";
import { useAppDispatch } from "../redux/store";
import { MessageActions } from "./messages.reducer";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user-reducer";

interface ContextMenuProps {
  children: ReactElement;
  message: Message;
}

const MessageContextMenu: FC<ContextMenuProps> = ({ children, message }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  const { user } = useSelector(selectUser);

  const dispatch = useAppDispatch();

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

  const handleDelete = async () => {
    handleClose();

    await messageApiService.delete(message.id);

    dispatch(MessageActions.deleteMessage(message.id));
  };

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
        {user?.id === message.authorId && (
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        )}
        <MenuItem onClick={handleClose}>Close</MenuItem>
      </Menu>
    </>
  );
};

export default MessageContextMenu;
