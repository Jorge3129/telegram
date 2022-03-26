import {IMessage} from "../types/types";

export const isSelf = (msg: IMessage) => msg && msg.author === localStorage.getItem('user');

export const getMsgById = (messageId: number, chatId: number, messages: IMessage[]) => {
    return messages
        .filter(msg => msg.chatId === chatId)
        .find(msg => msg.messageId === messageId);
}

export const alreadySeen = (timestamp: string, unread: number, messages: IMessage[]) => {
    const lastMessageSeen = messages.at(-(unread + 1));
    if (!lastMessageSeen) return false;
    // console.log('from unread: ' + lastMessageSeen.timestamp)
    // console.log('from onFirstRendered: ' + timestamp)
    return new Date(lastMessageSeen.timestamp) >= new Date(timestamp);
}
