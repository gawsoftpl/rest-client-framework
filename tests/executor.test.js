"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const executor_1 = require("../src/classes/executor");
const fs = require("fs");
describe("Method test", () => {
    let client;
    beforeEach(() => {
        client = new src_1.ClientTest("abc");
    });
    it("Test post method", async () => {
        const response = await (0, executor_1.executor)(client, {
            method: "POST",
            path: "/post",
            data: {
                a: 2,
                b: 3,
            },
        });
        expect(response.status()).toBe(200);
        expect(response.json().json).toMatchObject({
            a: 2,
            b: 3,
        });
    });
    it("Test patch method", async () => {
        const response = await (0, executor_1.executor)(client, {
            method: "PATCH",
            path: "/patch",
            data: {
                a: 2,
            },
        });
        expect(response.status()).toBe(200);
        expect(response.json().json).toMatchObject({
            a: 2,
        });
    });
    it("Test delete method", async () => {
        const response = await (0, executor_1.executor)(client, {
            method: "DELETE",
            path: "/delete",
            data: {
                a: 2,
            },
        });
        expect(response.status()).toBe(200);
    });
    it("Response json", async () => {
        const response = await (0, executor_1.executor)(client, {
            method: "GET",
            path: "/json",
            data: {
                a: 2,
            },
        });
        expect(response.status()).toBe(200);
        expect(response.json()).toMatchObject({
            slideshow: {
                author: "Yours Truly",
                date: "date of publication",
                slides: [
                    {
                        title: "Wake up to WonderWidgets!",
                        type: "all",
                    },
                    {
                        items: [
                            "Why <em>WonderWidgets</em> are great",
                            "Who <em>buys</em> WonderWidgets",
                        ],
                        title: "Overview",
                        type: "all",
                    },
                ],
                title: "Sample Slide Show",
            },
        });
    });
    it("Response gzipped json", async () => {
        const response = await (0, executor_1.executor)(client, {
            method: "GET",
            path: "/gzip",
            data: {
                a: 2,
            },
        });
        expect(response.status()).toBe(200);
        expect(response.json()).toMatchObject({
            gzipped: true,
        });
    });
    it("Response deflate json", async () => {
        const response = await (0, executor_1.executor)(client, {
            method: "GET",
            path: "/deflate",
            data: {
                a: 2,
            },
        });
        expect(response.status()).toBe(200);
        expect(response.json()).toMatchObject({
            deflated: true,
        });
    });
    it("Test save to", async () => {
        const savePath = "/tmp/test2.jpg";
        const response = await (0, executor_1.executor)(client, {
            method: "GET",
            path: "/image/jpeg",
            save_to: "/tmp/test2.jpg",
            acceptCode: [200],
        });
        expect(response.status()).toBe(200);
        expect(fs.existsSync(savePath)).toBeTruthy();
        expect(fs.statSync(savePath).size).toBe(35588);
    });
    it("Test accept codes", async () => {
        const savePath = "/tmp/test.jpg";
        await expect((0, executor_1.executor)(client, {
            method: "GET",
            path: "/status/300",
            acceptCode: [200],
        })).rejects.toThrow(Error);
    });
});
//# sourceMappingURL=executor.test.js.map