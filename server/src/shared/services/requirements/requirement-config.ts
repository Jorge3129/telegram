export type MaybePromise<T> = T | Promise<T>;

export type RequirementCheck =
  | MaybePromise<boolean>
  | (() => MaybePromise<boolean>);

export type RequirementError = Error | ((message?: string) => Error);

export interface RequirementConfig {
  check: RequirementCheck;
  err?: RequirementError;
  errMessage?: string;
}
