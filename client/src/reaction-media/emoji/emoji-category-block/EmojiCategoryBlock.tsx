import { FC } from "react";
import "./EmojiCategoryBlock.scss";

import { EmojiCategory } from "../emoji-category.type";
import { emojisInput$ } from "../emoji-input.subject";

interface Props {
  emojiBlock: EmojiCategory;
}

const EmojiCategoryBlock: FC<Props> = ({ emojiBlock }) => {
  const { name, emojis } = emojiBlock;

  const handleClick = (emoji: string) => {
    emojisInput$.next(emoji);
  };

  return (
    <div className="emoji_block">
      <div className="emoji_block_title">{name}</div>
      <ul className="emoji_list">
        {emojis.map((emoji) => (
          <li
            key={emoji}
            className="emoji_list_item"
            onClick={() => handleClick(emoji)}
          >
            {emoji}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmojiCategoryBlock;
