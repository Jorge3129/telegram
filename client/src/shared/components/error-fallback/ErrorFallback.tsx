import { FC } from "react";
import "./ErrorFallback.scss";

interface Props {
  error?: Error;
}

const ErrorFallback: FC<Props> = ({ error }) => {
  return (
    <div className="error_fallback_wrapper">
      <div className="error_fallback_wrapper">{error?.message}</div>
    </div>
  );
};

export default ErrorFallback;
