import { ChangeEvent, FC } from "react";
import "./FileInput.scss";
import { useDispatch } from "react-redux";
import { uploadsApiService } from "../../../uploads/uploads-api.service";
import { convertFileToMedia } from "../../../utils/convert-file-to-media";
import { CurrentChatActions } from "../../reducers/current-chat.reducer";

const FileInput: FC = () => {
  const dispatch = useDispatch();

  const saveToApi = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    uploadsApiService.preparePostFile(formData);
  };

  const saveToRedux = (file: File) => {
    const mediaObject = convertFileToMedia(file);
    dispatch(CurrentChatActions.setMedia(mediaObject));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e.target?.files?.[0]) {
      return;
    }

    saveToApi(e.target.files[0]);
    saveToRedux(e.target.files[0]);
  };

  return (
    <label className="chat_file_input_label icon_container">
      <input
        type="file"
        style={{ display: "none" }}
        className="chat_file_input"
        id="chat_file_input"
        onChange={handleChange}
      />
      <i className="fa-solid fa-paperclip add_media main_chat_icon" />
    </label>
  );
};

export default FileInput;
