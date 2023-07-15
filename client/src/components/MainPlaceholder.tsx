import DefaultWallPaper from "../shared/components/default-wallpaper/DefaultWallpaper";

const MainPlaceholder = () => {
  return (
    <div className="main_chat_placeholder main_section">
      <DefaultWallPaper />

      <div className="main_chat_placeholder_message">
        Select a chat to start messaging
      </div>
    </div>
  );
};

export default MainPlaceholder;
