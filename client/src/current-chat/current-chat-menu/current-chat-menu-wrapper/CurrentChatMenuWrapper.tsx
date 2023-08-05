import { FC, MouseEvent, CSSProperties, ReactElement } from "react";
import "./CurrentChatMenuWrapper.scss";
import { useContextMenu } from "../../../shared/hooks/use-context-menu";
import { Menu, MenuItem } from "@mui/material";

export type CurrentChatMenuChildProps = {
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  style?: CSSProperties | undefined;
};

export type CurrentChatMenuOptionConfig = {
  text: string;
  icon?: JSX.Element;
  enabled?: boolean;
  handler: () => void | Promise<void>;
};

export type CurrentChatMenuProps = {
  menuOptions: CurrentChatMenuOptionConfig[];
  renderChildren: (props: CurrentChatMenuChildProps) => ReactElement;
};

const CurrentChatMenuWrapper: FC<CurrentChatMenuProps> = ({
  menuOptions,
  renderChildren,
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
        onClick: handleOpenMenu,
      })}

      <Menu
        open={isMenuOpen}
        onClose={handleCloseMenu}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
        className="current_chat_menu"
      >
        {menuOptions.map(
          (option) =>
            option.enabled && (
              <MenuItem
                key={option.text}
                className="current_chat_menu_item"
                onClick={withCloseMenu(option.handler)}
              >
                <div className="current_chat_menu_item_content">
                  <div className="current_chat_menu_item_icon">
                    {option.icon}
                  </div>

                  <div className="current_chat_menu_item_text">
                    {option.text}
                  </div>
                </div>
              </MenuItem>
            )
        )}
      </Menu>
    </>
  );
};

export default CurrentChatMenuWrapper;
