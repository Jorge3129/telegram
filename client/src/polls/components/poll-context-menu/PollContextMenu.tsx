import { FC, ReactElement, cloneElement } from "react";
import "./PollContextMenu.scss";
import { Poll } from "../../models/poll.model";
import { Menu, MenuItem } from "@mui/material";
import { PollMessage } from "../../../messages/models/message.model";
import { useDeleteMessage } from "../../../messages/hooks/message-actions/use-delete-message";
import { useRetractVote } from "../../hooks/poll-actions/use-retract-vote";
import { useContextMenu } from "../../../shared/hooks/use-context-menu";

interface Props {
  children: ReactElement;
  message: PollMessage;
  poll: Poll;
}

const PollContextMenu: FC<Props> = ({ children, message, poll }) => {
  const {
    isMenuOpen,
    anchorPosition,
    handleOpenMenu,
    handleCloseMenu,
    withCloseMenu,
  } = useContextMenu();

  const handleDelete = useDeleteMessage(message);
  const handleRetractVote = useRetractVote(poll, message);

  const isOwnMessage = message.isCurrentUserAuthor;

  const userHasVoted = !!poll.userSelectedOptionIds.length;

  return (
    <>
      {cloneElement(children, {
        onContextMenu: handleOpenMenu,
        style: { cursor: "context-menu", userSelect: "none" },
      })}

      <Menu
        open={isMenuOpen}
        onClose={handleCloseMenu}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
      >
        {userHasVoted && !poll.isQuiz && (
          <MenuItem onClick={withCloseMenu(handleRetractVote)}>
            Retract vote
          </MenuItem>
        )}
        {isOwnMessage && (
          <MenuItem onClick={withCloseMenu(handleDelete)}>Delete</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default PollContextMenu;
