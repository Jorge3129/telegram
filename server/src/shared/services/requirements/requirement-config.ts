export type MaybePromise<T> = T | Promise<T>;

export type RequirementCheck =
  | MaybePromise<boolean>
  | (() => MaybePromise<boolean>);

export type RequirementError = string | Error | (() => Error | string);

export interface RequirementConfig {
  check: RequirementCheck;
  err: RequirementError;
}
