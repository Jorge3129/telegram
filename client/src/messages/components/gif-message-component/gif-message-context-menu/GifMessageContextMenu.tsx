import { FC, ReactElement, cloneElement, useState, MouseEvent } from "react";
import "./GifMessageContextMenu.scss";
import { Menu, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../redux/store";
import { selectUser } from "../../../../redux/user-reducer";
import { messageApiService } from "../../../messages-api.service";
import { MessageActions } from "../../../state/messages.reducer";
import { GifMessage } from "../../../models/message.model";

interface Props {
  children: ReactElement;
  message: GifMessage;
}

const GifMessageContextMenu: FC<Props> = ({ children, message }) => {
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
        {isOwnMessage && <MenuItem onClick={handleDelete}>Delete</MenuItem>}
      </Menu>
    </>
  );
};

export default GifMessageContextMenu;
