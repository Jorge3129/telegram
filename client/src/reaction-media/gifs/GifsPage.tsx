import { Grid } from "@giphy/react-components";
import { giphyFetch } from "./giphy-fetch";
import "./GifsPage.css";
import { useEffect, useRef, useState } from "react";
import ResizeObserver from "react-resize-observer";
import { IGif } from "@giphy/js-types";
import { useSendGif } from "./use-send-gif";

const GifsPage = () => {
  const sendGif = useSendGif();

  const onGifClick = async (gif: IGif) => {
    sendGif(gif);
  };

  const [width, setWidth] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  const fetchGifs = (offset: number) =>
    giphyFetch.trending({ offset, limit: 10 });

  return (
    <div className="gifs-container" ref={ref}>
      <Grid
        onGifClick={onGifClick}
        noLink
        hideAttribution
        fetchGifs={fetchGifs}
        width={width}
        columns={3}
        gutter={6}
      />

      <ResizeObserver
        onResize={({ width }) => {
          setWidth(width);
        }}
      />
    </div>
  );
};

export default GifsPage;
