import EmojiCategoryComponent from "./EmojiBlock";
import "./Emojis.css";
import { emojiCategories } from "./emoji-categories.const";

const EmojiList = () => {
  return (
    <ul className="emoji_blocks_list">
      {emojiCategories.map((emojiBlock) => (
        <li key={emojiBlock.name} className="emoji_blocks_list_item">
          <EmojiCategoryComponent emojiBlock={emojiBlock} />
        </li>
      ))}
    </ul>
  );
};

export default EmojiList;
