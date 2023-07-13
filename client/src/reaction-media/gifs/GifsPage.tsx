import { Grid } from "@giphy/react-components";
import { giphyFetch } from "./giphy-fetch";
import "./GifsPage.css";
import { useEffect, useRef, useState } from "react";
import ResizeObserver from "react-resize-observer";
import { IGif } from "@giphy/js-types";
import { useSendGif } from "./use-send-gif";
import ChatsSearchBar from "../../chats/components/ChatsSearchBar";

const GifsPage = () => {
  const sendGif = useSendGif();

  const onGifClick = (gif: IGif) => {
    void sendGif(gif);
  };

  const [width, setWidth] = useState(0);

  const [showGrid, setShowGrid] = useState(true);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    setShowGrid(false);
    setTimeout(() => {
      setShowGrid(true);
    }, 40);
  }, [searchItem]);

  const fetchGifs = (offset: number) => {
    if (searchItem) {
      return giphyFetch.search(searchItem, { offset, limit: 10 });
    }

    return giphyFetch.trending({ offset, limit: 10 });
  };

  return (
    <div className="gifs-container">
      <ChatsSearchBar searchItem={searchItem} setSearchItem={setSearchItem} />

      <div className="gifs-grid" ref={ref}>
        {showGrid ? (
          <Grid
            onGifClick={onGifClick}
            noLink
            hideAttribution
            fetchGifs={fetchGifs}
            width={width}
            columns={3}
            gutter={6}
          />
        ) : (
          "Loading..."
        )}

        <ResizeObserver
          onResize={({ width }) => {
            setWidth(width);
          }}
        />
      </div>
    </div>
  );
};

export default GifsPage;
