import { emojiCategories } from "../emoji-categories.const";
import EmojiCategoryBlock from "../emoji-category-block/EmojiCategoryBlock";
import "./EmojiList.scss";

const EmojiList = () => {
  return (
    <ul className="emoji_blocks_list">
      {emojiCategories.map((emojiBlock) => (
        <li key={emojiBlock.name} className="emoji_blocks_list_item">
          <EmojiCategoryBlock emojiBlock={emojiBlock} />
        </li>
      ))}
    </ul>
  );
};

export default EmojiList;
