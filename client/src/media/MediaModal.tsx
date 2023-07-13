import { FC, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { uploadsApiService } from "../uploads/uploads-api.service";
import { useSend } from "../current-chat/hooks/useSend";
import {
  selectCurrentChat,
  CurrentChatActions,
} from "../current-chat/reducers/current-chat.reducer";
import MediaContainer from "./MediaContainer";
import "./styles/MediaModal.css";

interface IMediaModal {}

const MediaModal: FC<IMediaModal> = () => {
  const dispatch = useAppDispatch();
  const { media } = useSelector(selectCurrentChat);

  const sendMessage = useSend("");

  const handleSend = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await sendMessage();
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

  if (!media.filename) {
    return null;
  }

  return (
    <div className="media_modal_container">
      <form className="media_modal">
        <li className="media_modal_file_container">
          <MediaContainer media={media} className="media_modal_img" />
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
