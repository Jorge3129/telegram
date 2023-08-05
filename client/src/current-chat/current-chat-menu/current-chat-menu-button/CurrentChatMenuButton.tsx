import { FC } from "react";
import "./CurrentChatMenuButton.scss";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupChatMenu from "../group-chat-menu/GroupChatMenu";

interface Props {}

const CurrentChatMenuButton: FC<Props> = () => {
  return (
    <GroupChatMenu
      renderChildren={(props) => (
        <IconButton {...props}>
          <MoreVertIcon />
        </IconButton>
      )}
    />
  );
};

export default CurrentChatMenuButton;
