import {useSelector} from "react-redux";
import {selectContextMenu, setContextMenu} from "../menu.reducer";
import {useAppDispatch} from "../../../redux/store";
import {MouseEvent} from "react";
import { IMessage } from "../../../types/types";


export const useContextMenu = (msg: IMessage) => {
    const {contextMenu} = useSelector(selectContextMenu)
    const dispatch = useAppDispatch();

    const handleContextMenu = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(setContextMenu({x: e.pageX, y: e.pageY, messageId: msg.messageId}));
    }

    return {contextMenu, handleContextMenu}
}
