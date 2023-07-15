import { FC } from "react";
import "./LoadingSpinner.scss";

interface Props {
  backgroundColor: string;
  startColor?: string;
  endColor?: string;
}

const LoadSpinner: FC<Props> = ({ startColor, endColor }) => {
  const outerStyle = {
    background: `conic-gradient(${startColor || "var(--white)"}, ${
      endColor || "var(--gray)"
    })}`,
  };

  return (
    <div className="load_spinner_container">
      <div className="load_spinner" style={outerStyle}>
        <div className="load_spinner_inside"></div>
      </div>
    </div>
  );
};

export default LoadSpinner;
