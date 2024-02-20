"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const axios_1 = require("axios");
const fs = require("fs");
class Request {
    constructor(strategy) {
        this.headers = {};
        this.requestResponseType = "arraybuffer";
        this.setConfig(this.client.config());
        this.setStrategy(strategy);
    }
    setConfig(config) {
        this.config = config;
        this.axiosInstance = axios_1.default.create({
            baseURL: config.endpoint,
            timeout: config.timeout,
        });
    }
    addHeaders(headers) {
        this.headers = { ...this.headers, ...headers };
    }
    getHeaders() {
        return this.headers;
    }
    setStrategy(client) {
        this.client = client;
        this.client.setAuthentication(this);
    }
    setResponseType(responseType) {
        this.requestResponseType = responseType;
    }
    buildHeaders() {
        this.headers = { ...this.headers, ...this.client.globalHeaders() };
        return this.headers;
    }
    axiosOptions() {
        const options = {
            headers: this.buildHeaders(),
            timeout: this.config.timeout,
            responseType: this.requestResponseType,
        };
        return options;
    }
    get(url, params = {}) {
        const options = this.axiosOptions();
        options.params = params;
        return this.axiosInstance.get(url, options);
    }
    post(url, body) {
        return this.axiosInstance.post(url, body, this.axiosOptions());
    }
    put(url, body) {
        return this.axiosInstance.put(url, body, this.axiosOptions());
    }
    download(url, save_path) {
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
    patch(url, body) {
        return this.axiosInstance.patch(url, body, this.axiosOptions());
    }
    remove(url, body) {
        return this.axiosInstance.delete(url, {
            data: body,
            ...this.axiosOptions(),
        });
    }
}
exports.Request = Request;
//# sourceMappingURL=request.js.map