import { ClientInterface, ResponseInterface } from "../interfaces";
import { Request } from "./request";
import { ConfigType } from "../types/config.type";
import { Response } from "./response";

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
      endpoint: "https://httpbin.org",
      timeout: 10000,
    };
  }

  globalHeaders(): Record<string, string> {
    return {};
  }

  setAuthentication(request: Request): void {
    request.addHeaders({ authorization: `Bearer ${this.api_key}` });
  }

  async extract(url: string): Promise<ResponseInterface> {
    const request = new Request(this);

    request.addHeaders({
      "Accept-Encoding": "gzip",
      "Content-Type": "application/json",
    });

    const response = await request.post(`/extract`, { a: 1 });
    if (response.status !== 200)
      throw new Error(
        `Cant download json file from server status code: ${response.status}`
      );

    return new Response(response);
  }
}
