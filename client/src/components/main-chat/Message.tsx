import React, {FC, useEffect, MouseEvent, useState} from 'react';
import {IMedia, IMessage} from "../../types/types";
import dayjs from "dayjs";
import {useContextMenu} from "./hooks/useContextMenu";
import {getSeenIcon} from "../chat-sidebar/chats.utils";
import ContextMenu from "./ContextMenu";
import {getMediaByType} from "../../utils/general.utils";
import {useLoadFile} from "./hooks/useLoadFile";

interface IPropsMessage {
    msg: IMessage;
    callback: null | (() => void);
    type: 'personal' | 'group'
}

const Message: FC<IPropsMessage> = ({msg, callback, type}) => {
    const {text, timestamp, seen, author, media} = msg;

    useEffect(() => {
        if (callback && !msg.seen) callback();
    }, [])

    const [file, setFile] = useState<IMedia | null>(null);

    useLoadFile(media, setFile);

    const {contextMenu, handleContextMenu} = useContextMenu(msg);
    const showAuthor = type === 'group' && author !== localStorage.getItem('user');

    return (
        <ul className="message_item" onContextMenu={handleContextMenu}>
            <li className="message_author">
                {showAuthor && author}
            </li>
            {file &&
                <li className="message_media">
                    {getMediaByType(file, 'message_img')}
                </li>
            }
            <li className="message_text">
                {text}
            </li>
            <li className="message_info">
                {getSeenIcon(msg)}
                <span className="message_timestamp">
                    {dayjs(timestamp).format('HH:mm')}
                </span>
            </li>
            <div className="clearfix">

            </div>
            <ContextMenu msg={msg} type={type} contextMenu={contextMenu}/>
        </ul>
    );
};

export default Message;
