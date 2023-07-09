import { FC, useState } from "react";
import MediaTopBar from "./MediaTopBar";
import EmojiList from "./emoji/EmojiList";
import "./styles/MediaSidebar.css";

export type ReactionMediaPage = {
  title: string;
  component: JSX.Element;
};

const MediaSidebar: FC = () => {
  const pages: ReactionMediaPage[] = [
    {
      title: "Emoji",
      component: <EmojiList />,
    },
    {
      title: "Stickers",
      component: <div>Stickers</div>,
    },
    {
      title: "GIFs",
      component: <div>GIFs</div>,
    },
  ];

  const [currentPage, setCurrentPage] = useState<ReactionMediaPage>(pages[0]);

  return (
    <div className="media_sidebar main_section">
      <MediaTopBar
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="media-page-container">{currentPage.component}</div>
    </div>
  );
};

export default MediaSidebar;
