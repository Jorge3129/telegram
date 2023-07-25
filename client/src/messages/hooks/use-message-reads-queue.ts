import { useMemo, useEffect, useCallback } from "react";
import { Message } from "../models/message.model";
import { MessageReadsQueue } from "../services/message-reads.queue";

export const useMessageReadsQueue = () => {
  const messageReadsQueue = useMemo(() => {
    return new MessageReadsQueue();
  }, []);

  useEffect(() => {
    messageReadsQueue.init();

    return () => {
      messageReadsQueue.destroy();
    };
  }, [messageReadsQueue]);

  const emitMessageRead = useCallback(
    (message: Message) => {
      messageReadsQueue.emitMessageRead(message);
    },
    [messageReadsQueue]
  );

  return {
    messageReadsQueue,
    emitMessageRead,
  };
};
