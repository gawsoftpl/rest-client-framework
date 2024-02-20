import { ClientInterface } from "../interfaces";
import { Request } from "./request";
import { ConfigType } from "../types/config.type";
export declare class ClientTest implements ClientInterface {
    private api_key;
    constructor(api_key: string);
    setApiKey(api_key: string): void;
    config(): ConfigType;
    globalHeaders(): Record<string, string>;
    setAuthentication(request: Request): void;
}
