import { FC, useState } from "react";
import ReactionMediaHeader from "./ReactionMediaHeader";
import EmojiList from "./emoji/EmojiList";
import "./styles/ReactionMediaPane.css";

export type ReactionMediaPage = {
  title: string;
  component: JSX.Element;
};

const ReactionMediaPane: FC = () => {
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
