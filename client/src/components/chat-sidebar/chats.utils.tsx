import dayjs from "dayjs";
import { User } from "../../types/types";
import { Message } from "../../chats/models/message.model";

export const initials = (title: string) => {
  const tokens = title.split(" ");
  return tokens
    .slice(0, 2)
    .map((t) => t.split("")[0])
    .join("")
    .toUpperCase();
};

export const formatTimestamp = (timestamp: string | undefined): string => {
  if (!timestamp) return "";
  const date = dayjs(timestamp);
  if (date.isSame(dayjs(), "date")) return date.format("HH:mm");
  if (date.isBetween(dayjs(), dayjs().subtract(5, "day")))
    return date.format("ddd");
  return date.format("DD.MM.YYYY");
};

export const getSeenIcon = (
  msg: Message | undefined,
  currentUser: User | null
) => {
  if (!msg || msg.author !== currentUser?.username) {
    return "";
  }

  return msg.seen ? (
    <i className="fa-solid fa-check-double chat_seen_icon" />
  ) : (
    <i className="fa-solid fa-check chat_seen_icon" />
  );
};
