import React, {ChangeEvent, FC} from 'react';
import {Socket} from 'socket.io-client';
import {setMedia} from "./reducers/main.chat.reducer";
import {useDispatch} from "react-redux";
import {convertFileToMedia} from "../../utils/general.utils";
import api from "../../api/api";

interface IFileInput {
    socket: Socket
}

const FileInput: FC<IFileInput> = ({socket}) => {

    const dispatch = useDispatch()

    const saveToApi = (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        api.preparePostFile(formData)
    }

    const saveToRedux = (file: File) => {
        const mediaObject = convertFileToMedia(file);
        dispatch(setMedia(mediaObject))
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (!e.target?.files) return;
        saveToApi(e.target.files[0])
        saveToRedux(e.target.files[0])
    }

    return (
        <label className="chat_file_input_label">
            <input
                type="file" style={{display: 'none'}}
                className="chat_file_input"
                id="chat_file_input"
                onChange={handleChange}
            />
            <i className="fa-solid fa-paperclip add_media input_icon"/>
        </label>
    )
}

export default FileInput;
