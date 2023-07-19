import { FC, ReactElement, cloneElement, useState, MouseEvent } from "react";
import "./PollContextMenu.scss";
import { Poll } from "../../models/poll.model";
import { Menu, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import { selectUser } from "../../../redux/user-reducer";
import { PollMessage } from "../../../messages/models/message.model";
import { messageApiService } from "../../../messages/messages-api.service";
import { MessageActions } from "../../../messages/messages.reducer";
import { pollsApiService } from "../polls-api.service";

interface Props {
  children: ReactElement;
  message: PollMessage;
  poll: Poll;
}

const PollContextMenu: FC<Props> = ({ children, message, poll }) => {
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

  const handleRetractVote = async () => {
    handleClose();

    await pollsApiService.retractVote(poll.id);

    dispatch(MessageActions.retractPollVote({ messageId: message.id }));
  };

  const isOwnMessage = user?.id === message.authorId;

  const userHasVoted = !!poll.userSelectedOptionIds.length;

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
        {userHasVoted && (
          <MenuItem onClick={handleRetractVote}>Retract vote</MenuItem>
        )}
        {isOwnMessage && <MenuItem onClick={handleDelete}>Delete</MenuItem>}
      </Menu>
    </>
  );
};

export default PollContextMenu;
