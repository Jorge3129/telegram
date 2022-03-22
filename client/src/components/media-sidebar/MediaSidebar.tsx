import React, {FC, useEffect, useState} from 'react';
import EmojiBlock, {IEmojiBlock} from "./EmojiBlock";
import './Emojis.css'
import {getEmoji} from "./emoji.utils";

export type EmojiList = IEmojiBlock[]

const MediaSidebar: FC = () => {

    const [emojiList, setEmojiList] = useState<EmojiList>([])

    useEffect(() => {
        setEmojiList(getEmoji());
    }, [])

    return (
        <div className="media_sidebar main_section">
            <ul className="emoji_blocks_list">
                {
                    emojiList.length
                    && emojiList.map(emojiBlock =>
                        <li key={emojiBlock.title}
                            className="emoji_blocks_list_item"
                        >
                            <EmojiBlock emojiBlock={emojiBlock}/>
                        </li>)
                }
            </ul>
        </div>
    );
};

export default MediaSidebar;
