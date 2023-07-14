import { FC, ReactElement, cloneElement, useState, MouseEvent } from "react";
import "./MessageContextMenu.scss";
import { Menu, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { CurrentChatActions } from "../../../current-chat/reducers/current-chat.reducer";
import { useAppDispatch } from "../../../redux/store";
import { selectUser } from "../../../redux/user-reducer";
import { messageApiService } from "../../messages-api.service";
import { MessageActions } from "../../messages.reducer";
import { Message } from "../../models/message.model";

interface Props {
  children: ReactElement;
  message: Message;
}

const MessageContextMenu: FC<Props> = ({ children, message }) => {
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

  const handleEdit = () => {
    handleClose();

    dispatch(
      CurrentChatActions.setInput({
        type: "edit",
        message: message,
      })
    );
  };

  const isOwnMessage = user?.id === message.authorId;

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
        {isOwnMessage && <MenuItem onClick={handleEdit}>Edit</MenuItem>}
        {isOwnMessage && <MenuItem onClick={handleDelete}>Delete</MenuItem>}
        <MenuItem onClick={handleClose}>Close</MenuItem>
      </Menu>
    </>
  );
};

export default MessageContextMenu;
