import { FC, ReactElement, useMemo } from "react";
import "./GroupChatMenu.scss";
import CurrentChatMenuWrapper, {
  CurrentChatMenuChildProps,
  CurrentChatMenuOptionConfig,
} from "../current-chat-menu-wrapper/CurrentChatMenuWrapper";
import PollIcon from "@mui/icons-material/Poll";
import { useOpenCreatePollModal } from "../../../polls/hooks/use-open-create-poll-modal";

interface Props {
  renderChildren: (props: CurrentChatMenuChildProps) => ReactElement;
}

const GroupChatMenu: FC<Props> = ({ renderChildren }) => {
  const openCreatePoll = useOpenCreatePollModal();

  const menuOptions: CurrentChatMenuOptionConfig[] = useMemo(
    () => [
      {
        text: "Create poll",
        icon: <PollIcon />,
        handler: () => {
          openCreatePoll();
        },
        enabled: true,
      },
    ],
    [openCreatePoll]
  );

  return (
    <CurrentChatMenuWrapper
      menuOptions={menuOptions}
      renderChildren={renderChildren}
    />
  );
};

export default GroupChatMenu;
