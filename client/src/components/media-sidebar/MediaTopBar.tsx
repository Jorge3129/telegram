import React, {useState} from 'react';
import './styles/MediaSidebar.css'

type MediaOption = 'EMOJI' | 'STICKERS' | 'GIFS';

const MediaTopBar = () => {

    const options = ['EMOJI', 'STICKERS', 'GIFS'] as MediaOption[];

    const [selectedOption, setSelectedOption] = useState<MediaOption>('EMOJI');

    const getClassname = (op: MediaOption) =>
        ' ' + op.toLowerCase() +
        (op === selectedOption ? ' media_selected_option' : '')

    return (
        <ul className="media_top_bar top_bar">
            {options.map(op =>
                <li
                    className={"media_top_bar_option" + getClassname(op)}
                    key={op}
                    onClick={e => setSelectedOption(op)}
                >
                    <div className={"media_top_bar_option_title"}>
                        {op}
                    </div>
                </li>)
            }
            <hr className={"selected_bottom_border " + selectedOption.toLowerCase()}/>
        </ul>
    );
};

export default MediaTopBar;
