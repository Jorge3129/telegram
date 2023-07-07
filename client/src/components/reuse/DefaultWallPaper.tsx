import { FC } from "react";
import "./styles/Loader.css";
import wallpaper from "../../assets/telegram_background.png";

interface Props {}

const DefaultWallPaper: FC<Props> = () => {
  return <img src={wallpaper} alt="wallpaper" className="chat_wallpaper" />;
};

export default DefaultWallPaper;
