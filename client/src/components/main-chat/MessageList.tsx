import Message from "./Message";
import React, {FC} from "react";
import {IChat, IMessage} from "../../types/types";
import Avatar from "../reuse/Avatar";
import {isSelf} from "../../utils/general.utils";

interface IMessageList {
    messages: IMessage[],
    onMessagesFirstRendered: null | (() => void);
    mainChat: IChat | null
}

const MessageList: FC<IMessageList> = ({messages, mainChat, onMessagesFirstRendered}) => {

    const avatar = (msg: IMessage, nextMsg: IMessage) =>
        !isSelf(msg) &&
        mainChat?.type === 'group' &&
        <Avatar
            prefix="message"
            title={msg.author}
            hide={(nextMsg && nextMsg.author === msg.author)}
        />

    return (
        <>
            {
                messages.map((msg, i, {length}) =>

                    <li
                        className={"message_list_item" + (isSelf(msg) ? ' self' : '')}
                        key={msg.messageId}
                        id={'message-' + msg.messageId}
                    >
                        {avatar(msg, messages[i + 1])}
                        <Message
                            msg={msg}
                            callback={i === length - 1 ? onMessagesFirstRendered : null}
                            type={mainChat?.type || 'personal'}
                        />
                        {msg.messageId}
                        {false && msg.author.split('')[0]}
                    </li>
                )
            }
        </>
    );
};


export default MessageList;
