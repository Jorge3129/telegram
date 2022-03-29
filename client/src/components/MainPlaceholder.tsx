import React from 'react';
import wallpaper from '../assets/telegram_background.png'

const MainPlaceholder = () => {
    return (
        <div className="main_chat_placeholder main_section">
            <img src={wallpaper} alt="wallpaper" className="chat_wallpaper"/>
            <div className="main_chat_placeholder_message">
                Select a chat to start messaging
            </div>
        </div>
    );
};

export default MainPlaceholder;
