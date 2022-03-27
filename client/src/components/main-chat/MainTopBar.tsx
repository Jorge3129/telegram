import React from 'react';
import {useSelector} from "react-redux";
import {selectMainChat} from "./reducers/main.chat.reducer";

const MainTopBar = () => {
    const {mainChat} = useSelector(selectMainChat);

    return (
        <div className="chat_top_bar">
            {mainChat?.title || ''}
        </div>
    );
};

export default MainTopBar;
