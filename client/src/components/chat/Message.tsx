import React, {FC} from 'react';
import {IMessage} from "../../types/types";
import dayjs from "dayjs";

interface IPropsMessage {
    msg: IMessage;
}

const Message: FC<IPropsMessage> = ({msg}) => {
    const {text, timestamp} = msg;

    return (
        <div className="message_item">
            <div className="message_text">
                {text}
            </div>
            <div className="message_info">
                {dayjs(timestamp).format('HH:mm')}
            </div>
        </div>
    );
};

export default Message;
