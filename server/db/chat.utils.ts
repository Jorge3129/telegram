import {IChat, IClientChat, IUser} from "../types/types";

const dayjs = require('dayjs')
import {getMessagesByChat} from "./db.functions";

export const mapChatToClient = ({id, members, type}: IChat, username: string, users: IUser[]): IClientChat => {

    let unreadCount = 0;
    const user = members.find(u => u.username === username);
    const lastRead = user?.lastRead;

    const msgs = getMessagesByChat(id);

    if (lastRead) {
        unreadCount = msgs
            .filter(m => dayjs(m.timestamp).diff(dayjs(lastRead), 'minute') > 0)
            .length;
    }

    const receiverName = members.find(u => u.username !== username)?.username || '';

    return {
        id,
        title: receiverName,
        lastMessage: msgs.slice(-1)[0],
        unread: unreadCount,
        muted: !!user?.muted,
        type,
        online: users.find(u => u.username === receiverName)?.online
    }
}
