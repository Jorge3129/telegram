import { CSSProperties, FC, MouseEvent, ReactElement } from "react";
import "./MessageContextMenu.scss";
import { Menu, MenuItem } from "@mui/material";
import { useContextMenu } from "../../../shared/hooks/use-context-menu";

export type MessageMenuChildProps = {
  onContextMenu?: (e: MouseEvent<HTMLElement>) => void;
  style?: CSSProperties | undefined;
};

export type MessageMenuOptionConfig = {
  text: string;
  icon?: JSX.Element;
  enabled?: boolean;
  handler: () => void | Promise<void>;
};

export type MessageMenuProps = {
  menuOptions: MessageMenuOptionConfig[];
  renderChildren: (props: MessageMenuChildProps) => ReactElement;
};

const MessageContextMenu: FC<MessageMenuProps> = ({
  renderChildren,
  menuOptions,
}) => {
  const {
    isMenuOpen,
    anchorPosition,
    handleOpenMenu,
    handleCloseMenu,
    withCloseMenu,
  } = useContextMenu();

  return (
    <>
      {renderChildren({
        onContextMenu: handleOpenMenu,
        style: { cursor: "context-menu", userSelect: "none" },
      })}

      <Menu
        open={isMenuOpen}
        onClose={handleCloseMenu}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
      >
        {menuOptions.map(
          (option) =>
            option.enabled && (
              <MenuItem
                key={option.text}
                onClick={withCloseMenu(option.handler)}
              >
                {option.text}
              </MenuItem>
            )
        )}
      </Menu>
    </>
  );
};

export default MessageContextMenu;
