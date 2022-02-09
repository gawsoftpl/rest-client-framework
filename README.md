# About
Rest client framework for your api client. In below example how to use this simple script


Write quick your api client
# Example

```js
// Client Stratgy
import { ClientInterface, Request, Response, ConfigType, ResponseInterface } from "@gawsoft/rest-api-client-framework";

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
  
  // Controllers
    async extract(url: string): Promise<ResponseInterface> {
        const request = new Request(this);

        request.addHeaders({
            "Accept-Encoding": "gzip",
            "Content-Type": "application/json",
        });

        const response = await request.post(`/person`, { name: "Johnny Kowalski" });
        if (response.status !== 200)
            throw new Error(
                `Cant download json file from server status code: ${response.status}`
            );

        return new Response(response);
    }
}



```