import { Injectable, PipeTransform } from '@nestjs/common';
import { ContentRange } from '../streaming/content-range.type';
import { parseRange } from './parse-range';

@Injectable()
export class ContentRangePipe
  implements PipeTransform<string, ContentRange | undefined>
{
  public transform(value: string | undefined): ContentRange | undefined {
    if (!value) {
      return undefined;
    }

    return parseRange(value);
  }
}
