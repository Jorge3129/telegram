import { FC, ReactElement, cloneElement } from "react";
import "./GifMessageContextMenu.scss";
import { Menu, MenuItem } from "@mui/material";
import { GifMessage } from "../../../models/message.model";
import { useDeleteMessage } from "../../../hooks/message-actions/use-delete-message";
import { useContextMenu } from "../../../../shared/hooks/use-context-menu";

interface Props {
  children: ReactElement;
  message: GifMessage;
}

const GifMessageContextMenu: FC<Props> = ({ children, message }) => {
  const {
    isMenuOpen,
    anchorPosition,
    handleOpenMenu,
    handleCloseMenu,
    withCloseMenu,
  } = useContextMenu();

  const handleDelete = useDeleteMessage(message);

  const isOwnMessage = message.isCurrentUserAuthor;

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
        {isOwnMessage && (
          <MenuItem onClick={withCloseMenu(handleDelete)}>Delete</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default GifMessageContextMenu;
