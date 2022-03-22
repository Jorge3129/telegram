import React, {FC, useEffect} from 'react';
import {IMessage} from "../../types/types";
import dayjs from "dayjs";

interface IPropsMessage {
    msg: IMessage;
    callback: null | (() => void);
}

const Message: FC<IPropsMessage> = ({msg, callback}) => {
    const {text, timestamp, seen} = msg;

    useEffect(() => {
        if (callback) callback();
    }, [])

    const getSeenIcon = () => {
        return msg.author !== localStorage.getItem('user') ? '' :
            seen ?
                <i className="fa-solid fa-check-double message_seen_icon"/>
                : <i className="fa-solid fa-check message_seen_icon"/>
    }

    return (
        <div className="message_item">
            <div className="message_text">
                {text}
            </div>
            <div className="message_info">
                {getSeenIcon()}
                <span className="message_timestamp">
                    {dayjs(timestamp).format('HH:mm')}
                </span>
            </div>
            <div className="clearfix">

            </div>
        </div>
    );
};

export default Message;
