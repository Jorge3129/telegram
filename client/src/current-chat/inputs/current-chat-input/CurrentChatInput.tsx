import { FC } from "react";
import "./CurrentChatInput.scss";
import { useSelector } from "react-redux";
import { selectCurrentChat } from "../../reducers/current-chat.reducer";
import CreateMessageInput from "../create-message-input/CreateMessageInput";
import EditMessageInput from "../edit-message-input/EditMessageInput";

const CurrentChatInput: FC = () => {
  const { inputState } = useSelector(selectCurrentChat);

  if (inputState.type === "edit") {
    return <EditMessageInput inputState={inputState} />;
  }

  return <CreateMessageInput inputState={inputState} />;
};

export default CurrentChatInput;
