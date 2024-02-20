"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const src_1 = require("../src");
describe("Test helpers", () => {
    it("Test convertAxiosResponse", async () => {
        const response = await axios_1.default.get("https://httpbin.org/get", {});
        const resp = (0, src_1.convertAxiosResponse)(response);
        expect(resp.headers()).toMatchObject({
            "content-type": "application/json",
        });
    });
});
//# sourceMappingURL=helpers.test.js.map