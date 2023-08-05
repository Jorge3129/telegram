import { FC, useState } from "react";
import "./CreatePollForm.scss";
import CreatePollOptionInput from "../create-poll-option-input/CreatePollOptionInput";
import { usePollOptionActions } from "../use-poll-option-actions";
import { formatWithQuantity } from "../../../../shared/utils/pluralize";
import { Button } from "@mui/material";
import { usePollSettings } from "../use-poll-settings";
import { CreatePollDto } from "../../../dto/create-poll.dto";
import { useSendMessage } from "../../../../current-chat/hooks/use-send-message";
import CreatePollSettings from "../create-poll-settings/CreatePollSettings";

interface Props {
  closeModal: () => void;
}

export type PollOptionState = {
  id: string;
  text: string;
};

const CreatePollForm: FC<Props> = ({ closeModal }) => {
  const [question, setQuestion] = useState("");

  const { options, editOption, removeOption, addOptionText, setAddOptionText } =
    usePollOptionActions();

  const { pollSettings, toggleSetting, settingsOptions } = usePollSettings();

  const optionsNumberLimit = 10;

  const canAddAnOption = options.length < optionsNumberLimit;

  const sendMessage = useSendMessage();

  const handleSubmit = () => {
    const pollDto: CreatePollDto = {
      ...pollSettings,
      question,
      answerOptions: options.map((option) => ({
        text: option.text,
      })),
    };

    void sendMessage({ type: "poll", poll: pollDto });
  };

  return (
    <div className="create_poll_form_wrapper">
      <form className="create_poll_form">
        <div className="create_poll_section">
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

          {canAddAnOption && (
            <input
              type="text"
              className="create_poll_input"
              placeholder="Add an option"
              value={addOptionText}
              onChange={(e) => setAddOptionText(e.target.value)}
            />
          )}
        </div>

        <div className="options_limit_message">
          {canAddAnOption
            ? `You can add ${formatWithQuantity(
                optionsNumberLimit - options.length,
                "more option"
              )}`
            : `You have added the maximum number of options`}
        </div>

        <CreatePollSettings
          settingsOptions={settingsOptions}
          pollSettings={pollSettings}
          toggleSetting={toggleSetting}
        />
      </form>

      <div className="create_poll_modal_buttons">
        <Button className="create_poll_modal_button" onClick={closeModal}>
          Cancel
        </Button>

        <Button
          className="create_poll_modal_button"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
            closeModal();
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreatePollForm;
