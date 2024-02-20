"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executor = void 0;
const response_1 = require("./response");
const request_1 = require("./request");
async function executor(client, data) {
    const request = new request_1.Request(client);
    let response;
    if (data.save_to) {
        response = await request.download(data.path, data.save_to);
    }
    else {
        switch (data.method) {
            case "POST":
                response = await request.post(data.path, data.data);
                break;
            case "GET":
                response = await request.get(data.path, data.data);
                break;
            case "DELETE":
                response = await request.remove(data.path, data.data);
                break;
            case "PATCH":
                response = await request.patch(data.path, data.data);
                break;
            case "PUT":
                response = await request.put(data.path, data.data);
                break;
            default:
                throw new Error("Unknown http method");
        }
    }
    if (!data.acceptCode)
        data.acceptCode = [200];
    if (data.acceptCode.indexOf(response.status) == -1) {
        throw new Error(`Wrong response status server status code: ${response.status}, error message: ${response.data}`);
    }
    return new response_1.Response(response);
}
exports.executor = executor;
//# sourceMappingURL=executor.js.map