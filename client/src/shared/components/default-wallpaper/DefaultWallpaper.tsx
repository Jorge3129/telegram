import { FC } from "react";
import "./DefaultWallpaper.scss";

import wallpaper from "../../../assets/telegram_background.png";

const DefaultWallPaper: FC = () => {
  return <img src={wallpaper} alt="wallpaper" className="chat_wallpaper" />;
};

export default DefaultWallPaper;
