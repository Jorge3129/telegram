import { FC } from "react";
import "./CreatePollOptionsList.scss";
import CreatePollOptionInput from "../create-poll-option-input/CreatePollOptionInput";
import { PollOptionState } from "../create-poll-form/CreatePollForm";
import { StateTuple } from "../../../../shared/types/state-tuple";

interface Props {
  options: PollOptionState[];
  editOption: (id: string, value: Partial<PollOptionState>) => void;
  removeOption: (id: string) => void;
  addOptionState: StateTuple<string>;
  canAddOption: boolean;
}

const CreatePollOptionsList: FC<Props> = ({
  options,
  editOption,
  removeOption,
  addOptionState,
  canAddOption,
}) => {
  const [addOptionText, setAddOptionText] = addOptionState;

  return (
    <div className="create_poll_section">
      <div className="create_poll_label">Poll options</div>

      <div className="poll_options_list">
        {options.map((option, index, { length }) => (
          <CreatePollOptionInput
            key={option.id}
            option={option}
            isLastOption={index === length - 1}
            editOption={editOption}
            removeOption={removeOption}
          />
        ))}
      </div>

      {canAddOption && (
        <input
          type="text"
          className="create_poll_input"
          placeholder="Add an option..."
          value={addOptionText}
          onChange={(e) => setAddOptionText(e.target.value)}
        />
      )}
    </div>
  );
};

export default CreatePollOptionsList;
