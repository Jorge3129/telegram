import { FC } from "react";
import { useSelector } from "react-redux";

import { selectCurrentChat } from "../reducers/current-chat.reducer";
import CreateMessageInput from "./CreateMessageInput";
import EditMessageInput from "./EditMessageInput";
import "./ChatInput.css";

interface Props {}

const ChatInput: FC<Props> = () => {
  const { inputState } = useSelector(selectCurrentChat);

  if (inputState.type === "edit") {
    return <EditMessageInput inputState={inputState} />;
  }

  return <CreateMessageInput inputState={inputState} />;
};

export default ChatInput;
