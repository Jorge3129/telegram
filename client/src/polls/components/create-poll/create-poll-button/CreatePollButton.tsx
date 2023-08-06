import { FC, useMemo } from "react";
import "./CreatePollButton.scss";
import { Button, Tooltip } from "@mui/material";
import { CreatePollDto } from "../../../dto/create-poll.dto";
import { useSendMessage } from "../../../../current-chat/hooks/use-send-message";
import { PollSettingsState } from "../use-poll-settings";
import { PollOptionState } from "../create-poll-form/CreatePollForm";

interface Props {
  question: string;
  options: PollOptionState[];
  pollSettings: PollSettingsState;
  closeModal: () => void;
}

const CreatePollButton: FC<Props> = ({
  question,
  options,
  pollSettings,
  closeModal,
}) => {
  const sendMessage = useSendMessage();

  const errorMessage = useMemo(() => {
    if (!question.length) {
      return "Please enter a question";
    }

    if (options.filter((option) => option.text).length < 2) {
      return "Please enter at least two options";
    }

    return "";
  }, [question, options]);

  const handleSubmit = () => {
    if (errorMessage) {
      return;
    }

    closeModal();

    const pollDto: CreatePollDto = {
      ...pollSettings,
      question,
      answerOptions: options
        .filter((option) => option.text)
        .map((option) => ({
          text: option.text,
        })),
    };

    void sendMessage({ type: "poll", poll: pollDto });
  };

  return (
    <Tooltip title={errorMessage} placement="top-start">
      <Button
        className="create_poll_modal_button"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Create
      </Button>
    </Tooltip>
  );
};

export default CreatePollButton;
