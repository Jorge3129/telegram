import { FC, useState } from "react";
import "./ReactionMediaPane.scss";
import GifsPage from "../gifs/gifs-page/GifsPage";
import EmojiPage from "../emoji/emoji-list/EmojiList";
import ReactionMediaHeader from "../reaction-media-header/ReactionMediaHeader";
import { ReactionMediaPage } from "../reaction-media-page.type";

const ReactionMediaPane: FC = () => {
  const pages: ReactionMediaPage[] = [
    {
      title: "Emoji",
      component: <EmojiPage />,
    },
    {
      title: "Stickers",
      component: <div>Stickers</div>,
    },
    {
      title: "GIFs",
      component: <GifsPage />,
    },
  ];

  const [currentPage, setCurrentPage] = useState<ReactionMediaPage>(pages[0]);

  return (
    <div className="reaction-media-pane main_section">
      <ReactionMediaHeader
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="reaction-media-page-container">
        {currentPage.component}
      </div>
    </div>
  );
};

export default ReactionMediaPane;
