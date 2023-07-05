import { ContentRange } from '../streaming/content-range.type';

export const parseRange = (range: string): ContentRange => {
  const [startRaw, endRaw] = range.replace(/bytes=/, '').split('-');

  return {
    start: parseInt(startRaw, 10),
    end: endRaw ? parseInt(endRaw, 10) : undefined,
  };
};
