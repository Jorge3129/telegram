import { FC } from "react";
import "./ReactionMediaHeader.scss";
import { ReactionMediaPage } from "../reaction-media-page.type";

interface Props {
  pages: ReactionMediaPage[];
  currentPage: ReactionMediaPage;
  setCurrentPage: (value: ReactionMediaPage) => void;
}

const ReactionMediaHeader: FC<Props> = ({
  pages,
  currentPage,
  setCurrentPage,
}) => {
  const getPageClassname = (page: ReactionMediaPage) => {
    return (
      page.title.toLowerCase() +
      (page.title === currentPage.title ? " media_selected_option" : "")
    );
  };

  return (
    <div className="reaction-media-header top_bar">
      {pages.map((page) => (
        <div
          className={"reaction-media-page-link " + getPageClassname(page)}
          key={page.title}
          onClick={() => setCurrentPage(page)}
        >
          <div className={"reaction-media-page-title"}>{page.title}</div>
        </div>
      ))}

      <hr
        className={"selected_bottom_border " + currentPage.title.toLowerCase()}
      />
    </div>
  );
};

export default ReactionMediaHeader;
