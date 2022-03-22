import dayjs from "dayjs";
import {IMessage} from "../../../types/types";

export const initials = (title: string) => {
    const tokens = title.split(' ');
    return tokens
        .slice(0, 2)
        .map(t => t.split('')[0])
        .join('')
        .toUpperCase()
}

export const formatTimestamp = (timestamp: string | undefined): string => {
    if (!timestamp) return ''
    const date = dayjs(timestamp);
    if (date.isSame(dayjs(), 'date')) return date.format('HH:mm')
    if (date.isBetween(dayjs(), dayjs().subtract(5, 'day'))) return date.format('ddd')
    return date.format('DD.MM.YYYY')
}

export const formatLastMessage = (message: IMessage | undefined): string => {
    if (!message) return ''
    const {author} = message;
    const user = localStorage.getItem('user') || '';
    return (author === user ? 'You: ' : '') + message.text;
}
