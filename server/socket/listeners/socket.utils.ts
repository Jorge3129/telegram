import {IUser} from "../../types/types";
import {chats} from "../../db/chats";

export const findUserContacts = (user: IUser) => {
    return chats.filter(ch => ch.members.find(u => u.username === user.username))
        .map(ch => ({
            username: ch.members.find(u => u.username !== user.username)?.username,
            chatId: ch.id
        }))
}
