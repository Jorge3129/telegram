import { IGif } from "@giphy/js-types";
import { CreateMessageDtoWithoutChat } from "../../messages/models/create-message.dto";
import { useSendMessage } from "../../current-chat/hooks/use-send-message";

export const useSendGif = () => {
  const handleSendMessage = useSendMessage();

  const handleSendGif = (gif: IGif) => {
    const messageDto: CreateMessageDtoWithoutChat = {
      type: "gif",
      srcObject: gif,
    };

    void handleSendMessage(messageDto);
  };

  return handleSendGif;
};
