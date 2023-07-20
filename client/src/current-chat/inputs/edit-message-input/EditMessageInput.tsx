import { FC, useEffect, useRef, useState, MouseEvent } from "react";
import "./EditMessageInput.scss";
import { useEmojiInput } from "../../../reaction-media/emoji/use-emoji-input";
import { useEditMessage } from "../../hooks/use-edit-message";
import { EditMessageInputState } from "../../reducers/current-chat-state.type";
import EditMessageBar from "../edit-message-bar/EditMessageBar";
import FileInput from "../file-input/FileInput";

interface Props {
  inputState: EditMessageInputState;
}

const EditMessageInput: FC<Props> = ({ inputState }) => {
  const [text, setText] = useState<string>(inputState.message.text);

  const inputRef = useRef<HTMLInputElement>(null);

  useEmojiInput((emoji) => setText((text) => text + emoji));

  useEffect(() => {
    inputRef.current?.focus();
  }, [text]);

  const editMessage = useEditMessage(text, inputState);

  const handleSubmit = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    void editMessage();
  };

  return (
    <div className="main_chat_input_container">
      <form className="main_chat_input_form edit_message_form">
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

        <div className="icon_container">
          <i className="fa-solid fa-face-smile main_chat_icon" />
        </div>

        {text ? (
          <div className="icon_container">
            <button
              type="submit"
              className="main_chat_send_button icon_container"
              onClick={handleSubmit}
            >
              <i className="fa-solid fa-check main_chat_send_icon" />
            </button>
          </div>
        ) : (
          <div className="icon_container">
            <i className="fa-solid fa-microphone main_chat_icon" />
          </div>
        )}
      </form>
    </div>
  );
};

export default EditMessageInput;
