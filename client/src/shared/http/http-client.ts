import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { wrapResponse as wrap } from "./wrap-response";

export class HttpClient {
  private readonly axios: AxiosInstance;

  constructor(baseURL?: string) {
    this.axios = axios.create({ baseURL });
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return wrap(this.axios.get(url, config));
  }

  public delete<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return wrap(this.axios.delete(url, config));
  }

  public post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return wrap(this.axios.post(url, data, config));
  }

  public put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return wrap(this.axios.put(url, data, config));
  }

  public patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return wrap(this.axios.patch(url, data, config));
  }
}

export const httpClient = new HttpClient();
