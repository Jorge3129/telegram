import { FC } from "react";
import { ReactionMediaPage } from "./MediaSidebar";
import "./styles/MediaTopBar.css";

interface Props {
  pages: ReactionMediaPage[];
  currentPage: ReactionMediaPage;
  setCurrentPage: (value: ReactionMediaPage) => void;
}

const MediaTopBar: FC<Props> = ({ pages, currentPage, setCurrentPage }) => {
  const getPageClassname = (page: ReactionMediaPage) => {
    return (
      page.title.toLowerCase() +
      (page.title === currentPage.title ? " media_selected_option" : "")
    );
  };

  return (
    <ul className="media_top_bar top_bar">
      {pages.map((page) => (
        <li
          className={"media_top_bar_option " + getPageClassname(page)}
          key={page.title}
          onClick={() => setCurrentPage(page)}
        >
          <div className={"media_top_bar_option_title"}>
            {page.title.toUpperCase()}
          </div>
        </li>
      ))}

      <hr
        className={"selected_bottom_border " + currentPage.title.toLowerCase()}
      />
    </ul>
  );
};

export default MediaTopBar;
