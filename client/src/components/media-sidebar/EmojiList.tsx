import React from 'react';
import {getEmoji} from "./emoji.utils";
import EmojiBlock from "./EmojiBlock";
import './styles/Emojis.css'

const EmojiList = () => {
    return (
        <div>
            <ul className="emoji_blocks_list">
                {getEmoji().map(emojiBlock =>
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

export default EmojiList;
