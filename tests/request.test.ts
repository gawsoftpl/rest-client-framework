import { ClientTest } from "../src";
import { Request } from "../src/classes/request";
import * as fs from "fs";

describe("test for request class", () => {
  let request;
  beforeEach(() => {
    request = new Request(new ClientTest("abc"));
  });

  it("Add headers", () => {
    request.addHeaders({
      "x-client": "Test header",
      "x-abc": "123",
    });

    expect(request.getHeaders()).toMatchObject({
      "x-client": "Test header",
      "x-abc": "123",
    });
  });

  it("axios options", () => {
    request.addHeaders({
      "x-client": "Test header",
    });

    expect(request.axiosOptions()).toMatchObject({
      headers: {
        "x-client": "Test header",
      },
      responseType: "arraybuffer",
      timeout: 10000,
    });
  });

  it("Get test", async () => {
    const response = await request.get("http://example.com", { a: 1, b: 2 });
    expect(response.config.method).toBe("get");
    expect(response.config.params).toMatchObject({
      a: 1,
      b: 2,
    });
  });

  it("Post test and json response", async () => {
    const response = await request.post("https://httpbin.org/post", {
      a: 1,
      b: 2,
    });

    expect(response.status).toBe(200);
    expect(response.config.method).toBe("post");
    expect(JSON.parse(response.data).json).toMatchObject({
      a: 1,
      b: 2,
    });
  });

  it("Download test", async () => {
    const savePath = "/tmp/test.jpg";
    const response = await request.download(
      "https://httpbin.org/image/jpeg",
      savePath
    );

    expect(response.status).toBe(200);
    expect(fs.existsSync(savePath)).toBeTruthy();
    expect(fs.statSync(savePath).size).toBeGreaterThan(20000);
  });
});
