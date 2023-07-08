import { FC } from "react";
import { Subject } from "rxjs";

export interface IEmojiBlock {
  title: string;
  data: string[];
}

interface IEmojiBlockProps {
  emojiBlock: IEmojiBlock;
}

export const emojisInput$ = new Subject<string>();

const EmojiBlock: FC<IEmojiBlockProps> = ({ emojiBlock }) => {
  const { title, data } = emojiBlock;

  const handleClick = (emoji: string) => {
    emojisInput$.next(emoji);
  };

  return (
    <div className="emoji_block">
      <div className="emoji_block_title">{title}</div>
      <ul className="emoji_list">
        {data.map((emoji) => (
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

export default EmojiBlock;
