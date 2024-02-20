import axios from "axios";
import { convertAxiosResponse } from "../src";

describe("Test helpers", () => {
  it("Test convertAxiosResponse", async () => {
    const response = await axios.get("https://httpbin.org/get", {});

    const resp = convertAxiosResponse(response);

    expect(resp.headers()).toMatchObject({
      "content-type": "application/json",
    });
  });
});
