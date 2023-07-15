import { useEffect } from "react";
import { emojisInput$ } from "./emoji-input.subject";

export const useEmojiInput = (callback: (emoji: string) => void) => {
  useEffect(() => {
    const sub = emojisInput$.subscribe((emoji) => callback(emoji));

    return () => {
      sub.unsubscribe();
    };
  }, []);
};
