import dayjs from "dayjs";

export const formatChatMessageTimestamp = (timestamp: string): string => {
  const date = dayjs(timestamp);

  if (date.isSame(dayjs(), "date")) {
    return date.format("HH:mm");
  }

  if (date.isBetween(dayjs(), dayjs().subtract(5, "day"))) {
    return date.format("ddd");
  }

  return date.format("DD.MM.YYYY");
};
