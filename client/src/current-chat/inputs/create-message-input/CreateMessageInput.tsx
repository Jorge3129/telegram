import { FC, useEffect, useRef, useState } from "react";
import "./CreateMessageInput.scss";
import { useSelector } from "react-redux";
import { useEmojiInput } from "../../../reaction-media/emoji/use-emoji-input";
import { useSendMessage } from "../../hooks/use-send-message";
import { CreateMessageInputState } from "../../reducers/current-chat-state.type";
import { selectCurrentChat } from "../../reducers/current-chat.reducer";
import FileInput from "../file-input/FileInput";

interface Props {
  inputState: CreateMessageInputState;
}

const CreateMessageInput: FC<Props> = () => {
  const { currentChatId } = useSelector(selectCurrentChat);
  const [text, setText] = useState("");

  useEmojiInput((emoji) => setText((text) => text + emoji));

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [text, currentChatId]);

  const sendMessage = useSendMessage();

  const handleSubmit = () => {
    setText("");

    const messageText = text;

    void sendMessage({
      type: "text",
      text: messageText,
    });
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
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
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
