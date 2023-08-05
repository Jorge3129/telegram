import { FC, ReactElement, useMemo } from "react";
import "./GroupChatMenu.scss";
import CurrentChatMenuWrapper, {
  CurrentChatMenuChildProps,
  CurrentChatMenuOptionConfig,
} from "../current-chat-menu-wrapper/CurrentChatMenuWrapper";
import PollIcon from "@mui/icons-material/Poll";

interface Props {
  renderChildren: (props: CurrentChatMenuChildProps) => ReactElement;
}

const GroupChatMenu: FC<Props> = ({ renderChildren }) => {
  const menuOptions: CurrentChatMenuOptionConfig[] = useMemo(
    () => [
      {
        text: "Create poll",
        icon: <PollIcon />,
        handler: () => {
          console.log("create poll");
        },
        enabled: true,
      },
    ],
    []
  );

  return (
    <CurrentChatMenuWrapper
      menuOptions={menuOptions}
      renderChildren={renderChildren}
    />
  );
};

export default GroupChatMenu;
