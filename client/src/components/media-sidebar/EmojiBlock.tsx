import React, { FC, MouseEvent } from "react";
import { useAppDispatch } from "../../redux/store";
import {
  addText,
  selectMainChat,
} from "../main-chat/reducers/main.chat.reducer";
import { useSelector } from "react-redux";

export interface IEmojiBlock {
  title: string;
  data: string[];
}

interface IEmojiBlockProps {
  emojiBlock: IEmojiBlock;
}

const EmojiBlock: FC<IEmojiBlockProps> = ({ emojiBlock }) => {
  const { title, data } = emojiBlock;
  const { currentChatId } = useSelector(selectMainChat);
  const dispatch = useAppDispatch();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (currentChatId) dispatch(addText(e.currentTarget.innerText));
  };

  return (
    <div className="emoji_block">
      <div className="emoji_block_title">{title}</div>
      <ul className="emoji_list">
        {data.map((emoji) => (
          <li key={emoji} className="emoji_list_item" onClick={handleClick}>
            {emoji}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmojiBlock;
