import { useAppDispatch } from "../../../redux/store";
import { messageApiService } from "../../messages-api.service";
import { Message } from "../../models/message.model";
import { MessageActions } from "../../state/messages.reducer";

export const useDeleteMessage = (message: Message) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    await messageApiService.delete(message.id);

    // TODO update latest message in chats
    dispatch(MessageActions.deleteMessage(message.id));
  };

  return handleDelete;
};
