export type MaybePromise<T> = T | Promise<T>;

export type RequirementCheck =
  // | MaybePromise<boolean>
  () => MaybePromise<boolean>;

export type RequirementError = Error | ((message?: string) => Error);

export type PositiveRequirementConfig = {
  check: RequirementCheck;
  err?: RequirementError;
  errMessage?: string;
};

export type NegativeRequirementConfig = {
  checkNot: RequirementCheck;
  err?: RequirementError;
  errMessage?: string;
};

export type RequirementConfig =
  | PositiveRequirementConfig
  | NegativeRequirementConfig;

export const isNegativeRequirement = (
  req: RequirementConfig,
): req is NegativeRequirementConfig => {
  return 'checkNot' in req;
};
