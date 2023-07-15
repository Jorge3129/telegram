import { FC, useEffect, useRef, useState, MouseEvent } from "react";
import "./CreateMessageInput.scss";
import { useSelector } from "react-redux";
import { useEmojiInput } from "../../../reaction-media/emoji/use-emoji-input";
import { useSend } from "../../hooks/useSend";
import { CreateMessageInputState } from "../../reducers/current-chat-state.type";
import { selectCurrentChat } from "../../reducers/current-chat.reducer";
import FileInput from "../file-input/FileInput";

interface Props {
  inputState: CreateMessageInputState;
}

const CreateMessageInput: FC<Props> = () => {
  const [text, setText] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEmojiInput((emoji) => setText((text) => text + emoji));

  const { currentChatId } = useSelector(selectCurrentChat);

  useEffect(() => {
    inputRef.current?.focus();
  }, [text, currentChatId]);

  const sendMessage = useSend(text);

  const handleSubmit = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setText("");
    void sendMessage();
  };

  return (
    <div className="main_chat_input_container">
      <form className="main_chat_input_form">
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
              <i className="fa-solid fa-paper-plane main_chat_send_icon" />
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

export default CreateMessageInput;
