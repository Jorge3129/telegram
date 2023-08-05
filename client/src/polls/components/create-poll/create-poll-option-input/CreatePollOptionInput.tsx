import { FC, useEffect, useRef } from "react";
import "./CreatePollOptionInput.scss";
import { PollOptionState } from "../create-poll-form/CreatePollForm";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  option: PollOptionState;
  isLastOption: boolean;
  editOption: (id: string, value: Partial<PollOptionState>) => void;
  removeOption: (id: string) => void;
}

const CreatePollOptionInput: FC<Props> = ({
  option,
  isLastOption,
  editOption,
  removeOption,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  }, [isLastOption]);

  useEffect(() => {
    if (!option.text && isLastOption) {
      removeOption(option.id);
    }
  }, [option.id, option.text, isLastOption, removeOption]);

  return (
    <div className="poll_option_item">
      <input
        ref={inputRef}
        type="text"
        name="question"
        className="poll_option_input"
        value={option.text}
        onChange={(e) => {
          const text = e.target.value;
          editOption(option.id, { text });
        }}
      />

      <IconButton onClick={() => removeOption(option.id)} tabIndex={-1}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default CreatePollOptionInput;
