import {IMessage} from "../types/types";
import {chats} from "./chatsTemp";

const dayjs = require('dayjs')

const chatNum = 5

const texts = ['hi', 'hey', 'yo', 'whosap',
    'React can be used as a base in the development ' +
    'of single-page, mobile, or server-rendered applications ' +
    'with frameworks like Next.js.', 'wow',
    'It is maintained by Meta (formerly Facebook) ' +
    'and a community of individual developers and companies.',
    'React (also known as React.js or ReactJS) is a free and ' +
    'open-source front-end JavaScript library[3] for ' +
    'building user interfaces based on UI components.']

const generateAuthor = (chatId: number) => {
    const chat = chats.find(ch => ch.id === chatId);
    return chat ? chat.members[Math.random() > 0.5 ? 1 : 0]?.username : ''
}

export const generateMsgs = (chatId: number): IMessage[] => new Array(Math.floor(Math.random() * 20) + 50)
    .fill({})
    .map((o, i, {length}): IMessage =>
        ({
            text: texts[Math.floor(Math.random() * 7) % 7],
            timestamp: dayjs().subtract((length - i) * 30 + (chatNum - chatId) * 2000, 'minute').format(),
            author: generateAuthor(chatId),
            chatId: chatId,
            messageId: i
        }))

export const messagesGen: IMessage[] = new Array(chatNum)
    .fill(0)
    .reduce((arr, _, i) => arr.concat(generateMsgs(i + 1)), [])

export const getMessagesByChat = (chatId: number, messages: IMessage[]): IMessage[] => {
    return messages
        .filter(m => m.chatId === chatId)
        .sort((a, b) => (
            Math.sign(dayjs(a.timestamp).diff(dayjs(b.timestamp), 'millisecond'))
        ))
}
