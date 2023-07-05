import { ReadStream } from 'typeorm/platform/PlatformTools';

export type StreamResponse = {
  fileStream: ReadStream;
  fileStats: StreamResponseStats;
};

export type StreamResponseStats = {
  contentSize: number;
  byteRange?: string;
};
