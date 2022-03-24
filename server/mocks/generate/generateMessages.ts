import {chats, messages} from "../../db/chats";
import ErrnoException = NodeJS.ErrnoException;
import {IChat, IMessage} from "../../types/types";

const fs = require('fs')

const writeFile = (filename: string, data: string) => {
    fs.writeFile(filename, data, (err: ErrnoException | null) => {
        if (err)
            console.log(err);
        else {
            console.log(`File ${filename} written successfully\n`);
        }
    })
}

const chatCorrectTemplate = (chat: IChat) => '    {\n' +
    `        id: ${chat.id},\n` +
    '        members: [\n' +
    `            {username: \'${chat.members[0].username}\', lastRead: \'2022-03-13T10:16:35+02:00\', muted: false},\n` +
    `            {username: \'${chat.members[1].username}\', lastRead: \'2011-10-05T14:48:00+02:00\', muted: true}\n` +
    '        ],\n' +
    '        type: \'personal\',\n' +
    '    },'

const genCorrectedStringChats = (): string => {
    return 'const chats: IChat[] = [\n' +
        chats.map((ch) =>
            chatCorrectTemplate(ch)
        ).join('\n') +
        '\n]';
}

writeFile('./mock.chats.ts', genCorrectedStringChats());

const messageTemplate = ({text, timestamp, author, chatId, messageId, seen}: IMessage) =>
    '    {\n' +
    `       text: \'${text}\',\n` +
    `       timestamp: \'${timestamp}\',\n` +
    `       author: \'${author}\',\n` +
    `       chatId: ${chatId},\n` +
    `       messageId: ${messageId},\n` +
    `       seen: ${seen},\n` +
    '    },'


const genStringMessages = (): string => {
    return 'const messagesTemp: IMessage[] = [\n' +
        messages.map((ch) =>
            messageTemplate(ch)
        ).join('\n') +
        '\n]';
}

writeFile('./mock.messages.ts', genStringMessages())
