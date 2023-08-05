import { FC, useCallback, useEffect, useRef, useState } from "react";
import "./CreatePollForm.scss";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import CreatePollOptionInput from "../create-poll-option-input/CreatePollOptionInput";

interface Props {}

export type PollOptionState = {
  id: string;
  text: string;
};

const CreatePollForm: FC<Props> = () => {
  const [question, setQuestion] = useState("");
  const [addOptionText, setAddOptionText] = useState("");
  const [options, setOptions] = useState<PollOptionState[]>([]);

  const addOptionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const addOption = (option: PollOptionState) => {
      setOptions((options) => [...options, option]);
    };

    if (!addOptionText) {
      return;
    }

    addOption({ id: uuid(), text: addOptionText });

    setAddOptionText("");
  }, [addOptionText]);

  const editOption = useCallback(
    (id: string, value: Partial<PollOptionState>) => {
      setOptions((options) => {
        const currentOption = _.find(options, { id });

        if (!currentOption) {
          return options;
        }

        return options.map((option) =>
          option.id === currentOption.id ? Object.assign(option, value) : option
        );
      });
    },
    []
  );

  const removeOption = useCallback((removedId: string) => {
    setOptions((options) => {
      return options.filter((option) => option.id !== removedId);
    });
  }, []);

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
            ref={addOptionInputRef}
            type="text"
            name="question"
            className="create_poll_input"
            placeholder="Add an option"
            value={addOptionText}
            onChange={(e) => {
              const text = e.target.value;
              setAddOptionText(text);
            }}
          />
        </div>

        <div className="options_section create_poll_section">
          <div className="create_poll_label">Settings</div>

          <input
            type="text"
            name="question"
            className="create_poll_input"
            placeholder="Ask a question"
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePollForm;
