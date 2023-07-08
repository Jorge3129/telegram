import { FC } from "react";

import { EditMessageInputState } from "../reducers/current-chat-state.type";
import "./EditMessageBar.css";
import { useAppDispatch } from "../../redux/store";
import { CurrentChatActions } from "../reducers/current-chat.reducer";

interface Props {
  inputState: EditMessageInputState;
}

const EditMessageBar: FC<Props> = ({ inputState }) => {
  const dispatch = useAppDispatch();

  const handleCancelEdit = () => {
    dispatch(CurrentChatActions.clearInput());
  };

  return (
    <div className="edit-message-display">
      <div className="input_icon_container">
        <i className="fa-solid fa-pen edit-message-icon"></i>
      </div>

      <div className="edit-message-info">
        <div className="edit-message-title">Edit message</div>
        <div className="edit-message-text">{inputState.message.text}</div>
      </div>

      <div className="input_icon_container" onClick={handleCancelEdit}>
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  );
};

export default EditMessageBar;
