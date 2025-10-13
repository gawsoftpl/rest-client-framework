import { ClientInterface } from "../interfaces";
import { Request } from "./request";
import { ConfigType } from "../types/config.type";

export class ClientTest implements ClientInterface {
  private api_key: string;

  constructor(api_key: string) {
    this.setApiKey(api_key);
  }

  setApiKey(api_key: string) {
    this.api_key = api_key;
  }

  config(): ConfigType {
    return {
      endpoint: "https://httpbin.io",
      timeout: 10000,
    };
  }

  globalHeaders(): Record<string, string> {
    return {};
  }

  setAuthentication(request: Request): void {
    request.addHeaders({ authorization: `Bearer ${this.api_key}` });
  }
}
