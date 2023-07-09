import { FC, useEffect, useRef, MouseEvent, useState } from "react";
import FileInput from "../FileInput";
import { EditMessageInputState } from "../reducers/current-chat-state.type";
import "./EditMessageInput.css";
import EditMessageBar from "./EditMessageBar";
import { useEditMessage } from "../hooks/use-edit-message";
import { useEmojiInput } from "../../emotions/hooks/use-emoji-input";

interface Props {
  inputState: EditMessageInputState;
}

const EditMessageInput: FC<Props> = ({ inputState }) => {
  const [text, setText] = useState(inputState.message.text);

  const inputRef = useRef<HTMLInputElement>(null);

  useEmojiInput((emoji) => setText((text) => text + emoji));

  useEffect(() => {
    inputRef.current?.focus();
  }, [text]);

  const editMessage = useEditMessage(text, inputState);

  const handleSubmit = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    editMessage();
  };

  return (
    <div className="main_chat_input_container">
      <form className="main_chat_input_form">
        <EditMessageBar inputState={inputState} />

        <FileInput />

        <input
          className="main_chat_input"
          type="text"
          placeholder=" Write a message..."
          value={text}
          ref={inputRef}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="input_icon_container">
          <i className="fa-solid fa-face-smile main_chat_icon" />
        </div>

        {text ? (
          <div className="input_icon_container">
            <button
              type="submit"
              className="main_chat_send_button input_icon_container"
              onClick={handleSubmit}
            >
              <i className="fa-solid fa-check main_chat_send_icon" />
            </button>
          </div>
        ) : (
          <div className="input_icon_container">
            <i className="fa-solid fa-microphone main_chat_icon" />
          </div>
        )}
      </form>
    </div>
  );
};

export default EditMessageInput;
