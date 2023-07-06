import { FC, MouseEvent } from "react";
import "./styles/MediaModal.css";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { useAppDispatch } from "../redux/store";
import { uploadsApiService } from "../uploads/uploads-api.service";
import { getMediaByType } from "../utils/general.utils";
import { useSend } from "./hooks/useSend";
import {
  selectCurrentChat,
  CurrentChatActions,
} from "./reducers/main.chat.reducer";

interface IMediaModal {
  socket: Socket;
}

const MediaModal: FC<IMediaModal> = ({ socket }) => {
  const dispatch = useAppDispatch();
  const { media } = useSelector(selectCurrentChat);
  const sendMessage = useSend(socket);

  const handleSend = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendMessage();
    dispatch(CurrentChatActions.clearMedia());
    await uploadsApiService.postFile();
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(CurrentChatActions.clearMedia());
  };

  //TODO
  // const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   dispatch(clearMedia());
  // };

  if (!media.filename) return null;

  return (
    <div className="media_modal_container">
      <form className="media_modal">
        <li className="media_modal_file_container">
          {getMediaByType(media, "media_modal_img")}
        </li>
        <div className="media_modal_buttons">
          <button
            className="media_modal_add_button media_modal_button"
            onClick={handleSend}
          >
            Add
          </button>
          <div className="media_modal_button_placeholder"></div>
          <button
            className="media_modal_cancel_button media_modal_button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="media_modal_send_button media_modal_button"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default MediaModal;
