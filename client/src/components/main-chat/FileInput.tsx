import React, {ChangeEvent, FC, useState, MouseEvent} from 'react';
import {Socket} from 'socket.io-client';
import {SERVER_URL} from "../../config";
import {useSend} from "./hooks/useSend";
import {setSrc} from "./main.chat.reducer";
import {useDispatch} from "react-redux";

interface IFileInput {
    socket: Socket
}

const FileInput: FC<IFileInput> = ({socket}) => {

    const [status, setStatus] = useState('')
    const dispatch = useDispatch()
    const sendMessage = useSend(socket)

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target?.files) return;
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', e.target.files[0])
        const response = await fetch(SERVER_URL + `/image`, {
            method: 'POST',
            body: formData,
        })
        if (response) setStatus(response.statusText)
        dispatch(setSrc(URL.createObjectURL(e.target.files[0])))
    }

    const handleCLick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        sendMessage()
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
            <button
                style={{position: 'fixed', top: '5em', left: '5em'}}
                onClick={handleCLick}
            >
                SEND!!!
            </button>
        </label>
    )
}

export default FileInput;
