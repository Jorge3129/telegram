export class ContentRange {
  start: number;
  end?: number;
}

export type FullContentRange = Required<ContentRange>;
