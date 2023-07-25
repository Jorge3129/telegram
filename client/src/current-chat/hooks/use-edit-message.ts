import { MessageActions } from "../../messages/state/messages.reducer";
import { ChatActions } from "../../chats/chats.reducer";
import {
  selectCurrentChat,
  CurrentChatActions,
} from "../reducers/current-chat.reducer";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user-reducer";
import { messageApiService } from "../../messages/messages-api.service";
import { EditMessageInputState } from "../reducers/current-chat-state.type";

export const useEditMessage = (
  inputText: string,
  inputState: EditMessageInputState
) => {
  const { currentChatId } = useSelector(selectCurrentChat);
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);

  const dispatchEditMessage = (
    messageId: string,
    chatId: number,
    text: string
  ) => {
    dispatch(MessageActions.editMessage({ messageId, text }));
    dispatch(ChatActions.editLastMessage({ chatId, messageId, text }));
  };

  const handleEdit = async () => {
    if (!user || !currentChatId) {
      return;
    }

    dispatch(CurrentChatActions.clearInput());

    const messageId = inputState.message.id;

    await messageApiService.edit(inputState.message.id, inputText);

    dispatchEditMessage(messageId, currentChatId, inputText);
  };

  return handleEdit;
};
