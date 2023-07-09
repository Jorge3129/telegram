import { FC } from "react";
import MediaTopBar from "./MediaTopBar";
import EmojiList from "./emoji/EmojiList";

const MediaSidebar: FC = () => {
  return (
    <div className="media_sidebar main_section">
      <MediaTopBar />
      <EmojiList />
    </div>
  );
};

export default MediaSidebar;
