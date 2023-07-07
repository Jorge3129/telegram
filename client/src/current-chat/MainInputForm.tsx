import { FC, useEffect, useRef, MouseEvent } from "react";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import FileInput from "./FileInput";
import { useAppDispatch } from "../redux/store";
import { useSend } from "./hooks/useSend";
import {
  selectCurrentChat,
  CurrentChatActions,
} from "./reducers/main.chat.reducer";

interface IMainInput {
  socket: Socket;
}

const MainInputForm: FC<IMainInput> = ({ socket }) => {
  const { text } = useSelector(selectCurrentChat);
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [text]);

  const sendMessage = useSend(socket);

  const handleSubmit = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="main_chat_input_container">
      <form className="main_chat_input_form">
        <FileInput socket={socket} />
        <input
          className="main_chat_input"
          type="text"
          placeholder=" Write a message..."
          value={text}
          ref={inputRef}
          onChange={(e) => dispatch(CurrentChatActions.setText(e.target.value))}
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

export default MainInputForm;
