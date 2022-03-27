import React, {FC} from 'react';
import {IChat, IMessage} from "../../types/types";
import {isSelf} from "../../utils/general.utils";
import Avatar from "./Avatar";

interface IMessageAvatar {
    data: {
        mainChat: IChat | null,
        msg: IMessage,
        nextMsg: IMessage
    }
}

const MessageAvatar: FC<IMessageAvatar> = ({data}) => {

    const {mainChat, msg, nextMsg} = data;

    if (mainChat?.type !== 'group' || isSelf(msg)) return null;

    return (<Avatar
        prefix="message"
        title={msg.author}
        hide={(nextMsg && nextMsg.author === msg.author)}
    />)
};

export default MessageAvatar;
