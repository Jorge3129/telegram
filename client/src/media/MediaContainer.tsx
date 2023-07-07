import { FC } from "react";
import { Media } from "../messages/models/message.model";

interface MediaContainerProps {
  media: Media;
  className: string;
}

const MediaContainer: FC<MediaContainerProps> = ({ media, className }) => {
  const type = media.type.split("/")[0];

  switch (type) {
    case "image":
      return <img className={className} src={media.src} alt={media.filename} />;
    case "video":
      return (
        <video className={className} controls>
          <source src={media.src} type={media.type} />
        </video>
      );
  }

  return <img className={className} src={media.src} alt={media.filename} />;
};

export default MediaContainer;
