import {IMessage} from "../types/types";

const dayjs = require('dayjs')

export const generateMsgs = (days: number = 0): IMessage[] => new Array(60)
    .fill({})
    .map((o): IMessage =>
        ({
            text: ['hi', 'hey', 'yo', 'whosap', 'yo bro', 'wow', 'cool', 'fine'][Math.floor(Math.random() * 7) % 7],
            timestamp: dayjs().subtract(days, 'day').format(),
            author: Math.random() > 0.5 ? 'a' : 'b',
            chatId: Math.floor(Math.random() * 5) + 1
        }))

export const messages: IMessage[] = generateMsgs();

export const getMessages = (chatId: number): IMessage[] => {
    return messages
        .filter(m => m.chatId === chatId)
        .sort((a, b) => (
            Math.sign(dayjs(a.timestamp).diff(dayjs(b.timestamp), 'millisecond'))
        ))
}
