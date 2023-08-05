import { useSelector } from "react-redux";
import {
  CurrentChatActions,
  selectCurrentChat,
} from "../reducers/current-chat.reducer";
import { useSendMessage } from "./use-send-message";
import { Media } from "../../messages/models/media.model";
import { useAppDispatch } from "../../redux/store";
import { CreateMessageDtoWithoutChat } from "../../messages/models/create-message.dto";
import { uploadsApiService } from "../../uploads/uploads-api.service";

export const useSendMediaMessage = () => {
  const { media } = useSelector(selectCurrentChat);
  const handleSendMessage = useSendMessage();
  const dispatch = useAppDispatch();

  const handleSendMediaMessage = () => {
    const messageDto: CreateMessageDtoWithoutChat = {
      type: "text",
      text: "",
      media: media.filename
        ? <Media>{
            filename: media.filename,
            type: media.type,
          }
        : undefined,
    };

    dispatch(CurrentChatActions.clearMedia());
    void uploadsApiService.postFile();
    void handleSendMessage(messageDto);
  };

  return handleSendMediaMessage;
};
