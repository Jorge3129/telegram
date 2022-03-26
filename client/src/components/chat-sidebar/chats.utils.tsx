import dayjs from "dayjs";
import {IMessage} from "../../types/types";
import React from "react";

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

export const formatChatAuthor = (message: IMessage | undefined, type: 'personal' | 'group'): string => {
    if (!message || type === 'personal') return ''
    const {author} = message;
    const user = localStorage.getItem('user') || '';
    return (author === user ? 'You: ' : author + ': ')
}

export const getSeenIcon = (msg: IMessage | undefined) => {
    if (!msg || msg.author !== localStorage.getItem('user')) return '';
    return msg.seen ?
        <i className="fa-solid fa-check-double chat_seen_icon"/>
        : <i className="fa-solid fa-check chat_seen_icon"/>;
}
