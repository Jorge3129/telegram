import { FC } from "react";
import { Message } from "../../messages/models/message.model";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user-reducer";

interface Props {
  message: Message;
  chatType: "personal" | "group";
}

const LastMessageAuthor: FC<Props> = ({ message, chatType }) => {
  const { user: currentUser } = useSelector(selectUser);

  if (chatType === "personal") {
    return null;
  }

  const { authorName, authorId } = message;

  const displayName = authorId === currentUser?.id ? "You" : authorName;

  return <>{`${displayName}: `}</>;
};

export default LastMessageAuthor;
