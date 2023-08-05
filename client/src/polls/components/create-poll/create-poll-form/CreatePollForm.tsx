import { FC, useState } from "react";
import "./CreatePollForm.scss";
import CreatePollOptionInput from "../create-poll-option-input/CreatePollOptionInput";
import { usePollOptionActions } from "../use-poll-option-actions";

interface Props {}

export type PollOptionState = {
  id: string;
  text: string;
};

const CreatePollForm: FC<Props> = () => {
  const [question, setQuestion] = useState("");

  const { options, editOption, removeOption, addOptionText, setAddOptionText } =
    usePollOptionActions();

  return (
    <div className="create_poll_form_wrapper">
      <form className="create_poll_form">
        <div className="question_section create_poll_section">
          <label htmlFor="question" className="create_poll_label">
            Question
          </label>

          <input
            type="text"
            name="question"
            className="create_poll_input"
            placeholder="Ask a question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="options_section create_poll_section">
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

          <input
            type="text"
            className="create_poll_input"
            placeholder="Add an option"
            value={addOptionText}
            onChange={(e) => setAddOptionText(e.target.value)}
          />
        </div>

        <div className="options_section create_poll_section">
          <div className="create_poll_label">Settings</div>

          <input
            type="text"
            className="create_poll_input"
            placeholder="Settings here"
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePollForm;
