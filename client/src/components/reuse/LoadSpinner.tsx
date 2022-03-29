import React, {CSSProperties, FC} from 'react';
import './styles/Loader.css'

interface ILoadSpinner {
    backgroundColor: string;
    startColor?: string;
    endColor?: string;
}

const LoadSpinner: FC<ILoadSpinner> = ({backgroundColor, startColor, endColor}) => {

    const outerStyle = {
        background: `conic-gradient(${startColor || 'var(--white)'}, ${endColor || 'var(--gray)'})}`
    }

    //style={{backgroundColor}}
    return (
        <div className="load_spinner_container">
            <div className="load_spinner" style={outerStyle}>
                <div className="load_spinner_inside" >

                </div>
            </div>
        </div>
    );
};

export default LoadSpinner;
