import { FC, useEffect, useRef, MouseEvent, useState } from "react";
import FileInput from "../FileInput";
import { useSend } from "../hooks/useSend";

import { CreateMessageInputState } from "../reducers/current-chat-state.type";
import { useEmojiInput } from "../../components/media-sidebar/use-emoji-input";
import { useSelector } from "react-redux";
import { selectCurrentChat } from "../reducers/current-chat.reducer";

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
    sendMessage();
    setText("");
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
              <i className="fa-solid fa-paper-plane main_chat_send_icon" />
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

export default CreateMessageInput;
