import { useNavigate } from "react-router-dom";
import { isHttpError } from "./http-error";

export const useHandleHttpError = () => {
  const navigate = useNavigate();

  const withHandleError = <F extends (...args: unknown[]) => unknown>(
    func: F
  ) => {
    return async (...args: Parameters<F>) => {
      try {
        await func(...args);
      } catch (err) {
        if (!isHttpError(err)) {
          return;
        }

        switch (err.status) {
          case 401:
            return navigate("/auth/login");
          case 404:
            return navigate("/404");
          default:
            return navigate("/error");
        }
      }
    };
  };

  return withHandleError;
};
