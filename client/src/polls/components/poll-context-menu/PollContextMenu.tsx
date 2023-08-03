import { FC, ReactElement, cloneElement, useState, MouseEvent } from "react";
import "./PollContextMenu.scss";
import { Poll } from "../../models/poll.model";
import { Menu, MenuItem } from "@mui/material";
import { PollMessage } from "../../../messages/models/message.model";
import { useDeleteMessage } from "../../../messages/hooks/message-actions/use-delete-message";
import { useRetractVote } from "../../hooks/poll-actions/use-retract-vote";

interface Props {
  children: ReactElement;
  message: PollMessage;
  poll: Poll;
}

const PollContextMenu: FC<Props> = ({ children, message, poll }) => {
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
  const handleRetractVote = useRetractVote(poll, message);

  const isOwnMessage = message.isCurrentUserAuthor;

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
        {userHasVoted && !poll.isQuiz && (
          <MenuItem onClick={withClose(handleRetractVote)}>
            Retract vote
          </MenuItem>
        )}
        {isOwnMessage && (
          <MenuItem onClick={withClose(handleDelete)}>Delete</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default PollContextMenu;
