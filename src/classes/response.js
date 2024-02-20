"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const fs = require("fs");
const zlib = require("zlib");
class Response {
    constructor(response) {
        this.setResponse(response);
    }
    fileType() {
        switch (this.response.headers["content-type"]) {
            case "application/json":
                return "json";
                break;
            case "image/jpeg":
            case "image/jpg":
                return "jpg";
                break;
            case "image/pdf":
                return "pdf";
                break;
            case "image/png":
                return "png";
                break;
            case "text/plain":
                return "txt";
                break;
        }
        throw new Error("Unknown file type");
    }
    setResponse(response) {
        this.response = response;
    }
    status() {
        return this.response.status;
    }
    decompress() {
        switch (this.encoded()) {
            case "gzip":
                return zlib.gunzipSync(this.response.data);
            case "deflate":
                return zlib.inflateSync(this.response.data);
        }
        return this.response.data;
    }
    contentType() {
        return this.response?.headers.hasOwnProperty("content-type")
            ? this.response.headers["content-type"]
            : null;
    }
    encoded() {
        return this.response?.headers.hasOwnProperty("content-encoding")
            ? this.response.headers["content-encoding"]
            : null;
    }
    body() {
        return this.response.data;
    }
    headers() {
        return this.response.headers;
    }
    json() {
        let buffer = this.response.data;
        if (this.encoded())
            buffer = this.decompress();
        const obj = JSON.parse(buffer);
        return obj;
    }
    save(path) {
        fs.writeFileSync(path, this.response.data);
    }
    base64() {
        return this.response.data.toString("base64");
    }
}
exports.Response = Response;
//# sourceMappingURL=response.js.map