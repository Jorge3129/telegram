import {Dispatch, FC, MouseEvent, SetStateAction} from 'react';
import {useSelector} from "react-redux";
import {selectChats} from "../../redux/chats.reducer";
import {IChat} from "../../types/types";
import ChatItem from "./ChatItem";
import './Chats.css'

interface IChatsContainer {
    setChat: Dispatch<SetStateAction<number | null>>
    chat: number | null
}

const ChatsContainer: FC<IChatsContainer> = ({chat, setChat}) => {

    const {chats, loading} = useSelector(selectChats);

    const handleChat = (e: MouseEvent<HTMLButtonElement>) => {
        const chatId = parseInt(e.currentTarget.id);
        setChat(chatId);
    }

    const chatList = loading ? <h4>Loading...</h4> :
        chats.map((ch: IChat) => (
            <li
                key={ch.id + ''}
                className="chat_list_item"
            >
                <button
                    className={"chat_item_button " + (chat === ch.id ? ' selected_chat' : '')}
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
