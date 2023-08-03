import { CurrentChatActions } from "../../../current-chat/reducers/current-chat.reducer";
import { useAppDispatch } from "../../../redux/store";
import { TextMessage } from "../../models/message.model";

export const useEditMessage = (message: TextMessage) => {
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(
      CurrentChatActions.setInput({
        type: "edit",
        message: message,
      })
    );
  };

  return handleEdit;
};
