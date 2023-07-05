import { Injectable } from '@nestjs/common';
import { FullContentRange, ContentRange } from './content-range.type';
import { StreamResponse, StreamResponseStats } from './stream-response.type';
import * as fs from 'fs';
import * as fsPromise from 'fs/promises';
import { ReadStream } from 'typeorm/platform/PlatformTools';

@Injectable()
export class StreamingService {
  public async streamFile(
    filePath: string,
    range?: ContentRange,
  ): Promise<StreamResponse> {
    const { size: totalSize } = await fsPromise.stat(filePath);

    const fullRange = this.getRangeWithDefaultEnd(range, totalSize);

    const fileStream = this.createFileStream(filePath, fullRange);

    return {
      fileStream,
      fileStats: this.getStats(totalSize, fullRange),
    };
  }

  private createFileStream(
    filePath: string,
    range: FullContentRange | null,
  ): ReadStream {
    const readOptions = range
      ? { start: range.start, end: range.end }
      : undefined;

    return fs.createReadStream(filePath, readOptions);
  }

  private getStats(
    totalSize: number,
    range: FullContentRange | null,
  ): StreamResponseStats {
    if (!range) {
      return { contentSize: totalSize };
    }

    const { start, end } = range;

    return {
      contentSize: end - start + 1,
      byteRange: `bytes ${start}-${end}/${totalSize}`,
    };
  }

  private getRangeWithDefaultEnd(
    range: ContentRange | undefined,
    totalSize: number,
  ): FullContentRange | null {
    if (!range) {
      return null;
    }

    const { start, end = totalSize - 1 } = range;

    return { start, end };
  }
}
