import { FC, useState } from "react";
import "./CreatePollForm.scss";
import { usePollOptionActions } from "../use-poll-option-actions";
import { formatWithQuantity } from "../../../../shared/utils/pluralize";
import { Button } from "@mui/material";
import { usePollSettings } from "../use-poll-settings";
import { CreatePollDto } from "../../../dto/create-poll.dto";
import { useSendMessage } from "../../../../current-chat/hooks/use-send-message";
import CreatePollSettings from "../create-poll-settings/CreatePollSettings";
import CreatePollQuestionInput from "../create-poll-question-input/CreatePollQuestionInput";
import CreatePollOptionsList from "../create-poll-options-list/CreatePollOptionsList";

interface Props {
  closeModal: () => void;
}

export type PollOptionState = {
  id: string;
  text: string;
};

const CreatePollForm: FC<Props> = ({ closeModal }) => {
  const [question, setQuestion] = useState("");

  const { options, editOption, removeOption, addOptionState } =
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
        <CreatePollQuestionInput
          question={question}
          setQuestion={setQuestion}
        />

        <CreatePollOptionsList
          canAddOption={canAddAnOption}
          addOptionState={addOptionState}
          editOption={editOption}
          removeOption={removeOption}
          options={options}
        />

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
