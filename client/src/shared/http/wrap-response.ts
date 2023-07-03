import { AxiosError } from "axios";
import { HttpError } from "./http-error";

export const wrapResponse = <T = any>(
  val: Promise<{ data: T }>
): Promise<T> => {
  return val
    .then((res) => res.data)
    .catch((err) => {
      const { response } = err as Required<AxiosError>;

      throw new HttpError(response.status, response.data);
    });
};
