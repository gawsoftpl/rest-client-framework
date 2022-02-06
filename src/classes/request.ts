import axios, { AxiosPromise } from "axios";
import { ConfigType } from "../types/config.type";
import * as fs from "fs";
import { ClientInterface } from "../interfaces/client.interface";
type ObjectKeys = Record<string, string>;

export type RequestResponseType =
  | "arraybuffer"
  | "document"
  | "json"
  | "text"
  | "stream";

export class Request {
  private headers: ObjectKeys = {};
  private client: ClientInterface;
  private axiosInstance;
  private requestResponseType: RequestResponseType = "arraybuffer";
  private config: ConfigType;

  constructor(strategy: ClientInterface) {
    this.client = strategy;
    this.setConfig(this.client.config());
  }

  setConfig(config: ConfigType) {
    this.config = config;
    this.axiosInstance = axios.create({
      baseURL: config.endpoint,
      timeout: config.timeout,
    });
  }

  addHeaders(headers: ObjectKeys) {
    this.headers = { ...this.headers, ...headers };
  }

  getHeaders(): ObjectKeys {
    return this.headers;
  }

  setStrategy(client: ClientInterface) {
    this.client = client;
    this.client.setAuthentication(this);
  }

  setResponseType(responseType: RequestResponseType) {
    this.requestResponseType = responseType;
  }

  protected buildHeaders(): ObjectKeys {
    this.headers = { ...this.headers, ...this.client.globalHeaders() };
    return this.headers;
  }

  protected axiosOptions() {
    const options: Record<string, any> = {
      headers: this.buildHeaders(),
      timeout: this.config.timeout,
      responseType: this.requestResponseType,
    };

    return options;
  }

  get(url: string, params: ObjectKeys = {}): AxiosPromise {
    const options = this.axiosOptions();
    options.params = params;

    return this.axiosInstance.get(url, options);
  }

  post(url: string, body: Record<string, any>): AxiosPromise {
    return this.axiosInstance.post(url, body, this.axiosOptions());
  }

  put(url: string, body: Record<string, any>): AxiosPromise {
    return this.axiosInstance.put(url, body, this.axiosOptions());
  }

  download(url: string, save_path: string) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(url, { responseType: "stream" })
        .then((response) => {
          response.data.pipe(fs.createWriteStream(save_path));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  patch(url: string, body: Record<string, any>): AxiosPromise {
    return this.axiosInstance.patch(url, body, this.axiosOptions());
  }

  remove(url: string, body: Record<string, any>): AxiosPromise {
    return this.axiosInstance.delete(url,  this.axiosOptions());
  }
}
