import { FC } from "react";
import { Subject } from "rxjs";
import { EmojiCategory } from "./emoji-category.type";

interface Props {
  emojiBlock: EmojiCategory;
}

export const emojisInput$ = new Subject<string>();

const EmojiCategoryComponent: FC<Props> = ({ emojiBlock }) => {
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

export default EmojiCategoryComponent;
