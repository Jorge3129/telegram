import { FC, MouseEvent, PropsWithChildren } from "react";
import "./PollButton.scss";
import { classIf } from "../../../utils/class-if";
import { Button } from "@mui/material";

interface Props {
  isOwnPoll: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const PollButton: FC<PropsWithChildren<Props>> = ({
  disabled,
  isOwnPoll,
  onClick,
  children,
}) => {
  return (
    <Button
      className={"poll_button" + classIf(isOwnPoll, "own_poll")}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default PollButton;
