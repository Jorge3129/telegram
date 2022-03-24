import {IMessage} from "../types/types";


export const getVisibleHeight = (element: Element, container: HTMLElement | null): number => {
    if (!container) return -1;
    let scrollTop = container.scrollTop;
    let scrollBot = scrollTop + container.clientHeight;
    let containerRect = container.getBoundingClientRect();
    let eleRect = element.getBoundingClientRect();
    let rect = {
        top: eleRect.top - containerRect.top,
        right: eleRect.right - containerRect.right,
        bottom: eleRect.bottom - containerRect.bottom,
        left: eleRect.left - containerRect.left,
    }
    let eleTop = rect.top + scrollTop;
    let eleBot = eleTop + element.clientHeight;
    let visibleTop = eleTop < scrollTop ? scrollTop : eleTop;
    let visibleBot = eleBot > scrollBot ? scrollBot : eleBot;

    return visibleBot - visibleTop;
}


export const calculateUnread = (message: IMessage, messages: IMessage[]) => {
    const index = messages.indexOf(message);
    return messages.slice(index + 1).length;
}
