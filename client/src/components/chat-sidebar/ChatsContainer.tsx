import {Dispatch, FC, MouseEvent, SetStateAction, useMemo} from 'react';
import {useSelector} from "react-redux";
import {selectChats} from "../../redux/chats.reducer";
import {IChat} from "../../types/types";
import ChatItem from "./ChatItem";
import './styles/Chats.css'
import * as _ from 'lodash'
import {useAppDispatch} from "../../redux/store";
import {setChatId} from "../../redux/main.chat.reducer";

interface IChatsContainer {
    setChat: Dispatch<SetStateAction<IChat | null>>
    chat: IChat | null
}

const ChatsContainer: FC<IChatsContainer> = ({chat, setChat}) => {

    const {chats, loading} = useSelector(selectChats);
    const dispatch = useAppDispatch()

    const handleChat = (e: MouseEvent<HTMLButtonElement>) => {
        const chatId = parseInt(e.currentTarget.id);
        const chatObject = chats.find(ch => ch.id === chatId);
        if (chatObject) setChat(chatObject);
        dispatch(setChatId(chatId))
    }

    const sortedChats = useMemo(() => {
        return _.sortBy(chats, (ch: IChat) =>
            ch.lastMessage ?
                new Date(ch.lastMessage.timestamp) : new Date())
            .reverse();
    }, [chats]);

    const chatList = loading ? <h4>Loading...</h4> :
        sortedChats.map((ch: IChat) => (
            <li
                key={ch.id + ''}
                className="chat_list_item"
            >
                <button
                    className={"chat_item_button " + (chat?.id === ch.id ? ' selected_chat' : '')}
                    id={ch.id + ''}
                    onClick={handleChat}
                >
                    <ChatItem chat={ch}/>
                </button>
            </li>
        ))

    return (
        <div className="chats_container main_section">
            <ul className="chat_list">
                {chatList}
            </ul>
        </div>
    );
};

export default ChatsContainer;
