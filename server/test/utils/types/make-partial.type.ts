export type MakePartial<TObject, TKeys extends keyof TObject> = Omit<
  TObject,
  TKeys
> &
  Partial<Pick<TObject, TKeys>>;
