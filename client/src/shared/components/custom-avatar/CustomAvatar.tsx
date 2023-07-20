import { CSSProperties, FC } from "react";
import "./CustomAvatar.scss";
import { initials } from "../../utils/format-initials";

interface Props {
  hide?: boolean;
  title: string;
  prefix: string;
}

const CustomAvatar: FC<Props> = ({ title, prefix, hide }) => {
  const style: CSSProperties = hide ? { visibility: "hidden" } : {};

  return (
    <div className={prefix + "_avatar_wrapper avatar_wrapper"} style={style}>
      <div className={prefix + "_avatar avatar"}>
        <div className={prefix + "_avatar_text avatar_text"}>
          {initials(title)}
        </div>
      </div>
    </div>
  );
};

export default CustomAvatar;
