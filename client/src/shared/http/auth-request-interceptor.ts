import { InternalAxiosRequestConfig } from "axios";
import { tokenService } from "../../auth/services/token.service";

export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = tokenService.getAccessToken();

  const headers = config.headers ?? {};

  headers["Authorization"] = `Bearer ${token}`;

  config.headers = headers;

  return config;
};
