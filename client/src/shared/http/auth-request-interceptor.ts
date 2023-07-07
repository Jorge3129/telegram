import { InternalAxiosRequestConfig } from "axios";
import { tokenService } from "../../auth/services/token.service";

export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const headers = config.headers ?? {};

  headers["Authorization"] = tokenService.getBearer();

  config.headers = headers;

  return config;
};
