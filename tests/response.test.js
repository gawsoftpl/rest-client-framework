"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../src/classes/response");
const zlib = require("zlib");
const fs = require("fs");
describe("Client test", () => {
    let response;
    let axiosResponse;
    const exampleData = {
        test: "abc",
    };
    beforeEach(() => {
        axiosResponse = {
            data: Buffer.from(JSON.stringify(exampleData)),
            headers: {
                "content-type": "application/json",
            },
            status: 200,
        };
        response = new response_1.Response(axiosResponse);
    });
    it("Should return content-type", () => {
        expect(response.contentType()).toBe("application/json");
    });
    it("Should response json", () => {
        expect(response.json()).toMatchObject({ test: "abc" });
    });
    it("should response file type as json", () => {
        expect(response.fileType()).toBe("json");
    });
    it("should response file type as json", () => {
        axiosResponse.headers["content-type"] = "image/png";
        response.setResponse(axiosResponse);
        expect(response.fileType()).toBe("png");
        expect(response.contentType()).toBe("image/png");
    });
    it("should response status", () => {
        axiosResponse.status = 454;
        response.setResponse(axiosResponse);
        expect(response.status()).toBe(454);
    });
    it("should return throw json parse exception because no headers with content-encoding but json in encoded in gzip", async () => {
        axiosResponse.headers = {
            "content-type": "application/json",
        };
        axiosResponse.data = zlib.gzipSync(Buffer.from(JSON.stringify({ test_compress: 1 })));
        response.setResponse(axiosResponse);
        expect(() => response.json()).toThrow(Error);
    });
    it("should return encoded as gzip and decode json", () => {
        axiosResponse.headers = {
            "content-encoding": "gzip",
            "content-type": "application/json",
        };
        axiosResponse.data = zlib.gzipSync(Buffer.from(JSON.stringify({ test_compress: 1 })));
        response.setResponse(axiosResponse);
        expect(response.json()).toMatchObject({
            test_compress: 1,
        });
    });
    it("should save in /tmp", () => {
        const filePath = "/tmp/test.json";
        response.save(filePath);
        expect(JSON.parse(fs.readFileSync(filePath, "utf-8"))).toMatchObject(exampleData);
    });
    it("should calc base64 about file", () => {
        expect(response.base64()).toBe("eyJ0ZXN0IjoiYWJjIn0=");
    });
    it("Should return buffer from body", () => {
        expect(response.body()).toBe(axiosResponse.data);
    });
    it("SHould return headers", () => {
        expect(response.headers()).toBe(axiosResponse.headers);
    });
});
//# sourceMappingURL=response.test.js.map