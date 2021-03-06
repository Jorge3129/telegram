import {initials} from "../chat-sidebar/chats.utils";
import React, {CSSProperties, FC} from "react";
import {IChat, IMessage} from "../../types/types";
import {isSelf} from "../../utils/general.utils";

interface IAvatar {
    chat?: IChat,
    hide?: boolean
    title: string
    prefix: string
}

const Avatar: FC<IAvatar> = ({chat, title, prefix, hide}) => {

    const style: CSSProperties = hide ? {visibility: 'hidden'} : {};

    return (
        <div className={prefix + "_avatar_wrapper avatar_wrapper"} style={style}>
            <div className={prefix + "_avatar avatar" + (chat?.online && prefix === 'chat' ? ' online' : '')}>
                <div className={prefix + "_avatar_text avatar_text"}>
                    {initials(title)}
                </div>
            </div>
        </div>
    );
};

export default Avatar;

