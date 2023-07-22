import { ChangeEvent, FC } from "react";
import "./PollOptionCheckbox.scss";

interface Props {
  userHasVoted: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const PollOptionCheckbox: FC<Props> = ({
  userHasVoted,
  onChange,
  checked = false,
}) => {
  return (
    <input
      className="poll_answer_option_checkbox"
      type="checkbox"
      checked={checked}
      disabled={userHasVoted}
      onChange={onChange}
    />
  );
};

export default PollOptionCheckbox;
