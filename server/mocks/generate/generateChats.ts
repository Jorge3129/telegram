import {users} from "../../db/mock.users";
import ErrnoException = NodeJS.ErrnoException;
import {chats} from "../../db/chats";
import {IChat} from "../../types/types";

const fs = require('fs')

const chatTemplate = (user1: string, user2: string, index: number) => '    {\n' +
    `        id: ${index},\n` +
    '        members: [\n' +
    `            {username: \'${user1}\', lastRead: \'2022-03-13T10:16:35+02:00\', muted: false},\n` +
    `            {username: \'${user2}\', lastRead: \'2011-10-05T14:48:00+02:00\', muted: true}\n` +
    '        ],\n' +
    '        type: \'personal\',\n' +
    '    },'

const chatArray = () => {
    const pairs: Array<string[]> = [];
    console.log(users)
    for (const u1 of users.map(u => u.username)) {
        for (const u2 of users.map(u => u.username)) {
            if (pairs.find(pair => (
                (pair.includes(u1)
                    && pair.includes(u2)
                    || u1 === u2)
            ))) continue;
            console.log(u1, u2)
            pairs.push([u1, u2]);
        }
    }
    return pairs;
}

const genStringChats = (): string => {
    return 'const chats: IChat[] = [\n' +
        chatArray().map((ch, i) =>
            chatTemplate(ch[0], ch[1], i + 5)
        ).join('\n') +
        '\n]';
}

fs.writeFile('./mock.chats.ts', genStringChats(), (err: ErrnoException | null) => {
    if (err)
        console.log(err);
    else {
        console.log("File written successfully\n");
    }
})
