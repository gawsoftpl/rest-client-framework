"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientTest = void 0;
class ClientTest {
    constructor(api_key) {
        this.setApiKey(api_key);
    }
    setApiKey(api_key) {
        this.api_key = api_key;
    }
    config() {
        return {
            endpoint: "https://httpbin.org",
            timeout: 10000,
        };
    }
    globalHeaders() {
        return {};
    }
    setAuthentication(request) {
        request.addHeaders({ authorization: `Bearer ${this.api_key}` });
    }
}
exports.ClientTest = ClientTest;
//# sourceMappingURL=client.js.map