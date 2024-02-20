import { AxiosPromise } from "axios";
import { ConfigType } from "../types/config.type";
import { ClientInterface } from "../interfaces/client.interface";
type ObjectKeys = Record<string, string>;
export type RequestResponseType = "arraybuffer" | "document" | "json" | "text" | "stream";
export declare class Request {
    private headers;
    private client;
    private axiosInstance;
    private requestResponseType;
    private config;
    constructor(strategy: ClientInterface);
    setConfig(config: ConfigType): void;
    addHeaders(headers: ObjectKeys): void;
    getHeaders(): ObjectKeys;
    setStrategy(client: ClientInterface): void;
    setResponseType(responseType: RequestResponseType): void;
    protected buildHeaders(): ObjectKeys;
    protected axiosOptions(): Record<string, any>;
    get(url: string, params?: ObjectKeys): AxiosPromise;
    post(url: string, body: Record<string, any>): AxiosPromise;
    put(url: string, body: Record<string, any>): AxiosPromise;
    download(url: string, save_path: string): Promise<unknown>;
    patch(url: string, body: Record<string, any>): AxiosPromise;
    remove(url: string, body: Record<string, any>): AxiosPromise;
}
export {};
