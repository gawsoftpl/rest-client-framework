import * as fs from "fs";
import { ResponseInterface } from "../interfaces/response.interface";
import * as zlib from "zlib";
import { LibraryResponseInterface } from "../interfaces/LibraryResponse.interface";

export class Response<ResponseType = any>
  implements ResponseInterface<ResponseType>
{
  private response;

  constructor(response: LibraryResponseInterface<ResponseType>) {
    this.setResponse(response);
  }

  fileType(): string {
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

  setResponse(response: LibraryResponseInterface<ResponseType>) {
    this.response = response;
  }

  status(): number {
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

  contentType(): string {
    return this.response?.headers.hasOwnProperty("content-type")
      ? this.response.headers["content-type"]
      : null;
  }

  encoded(): string {
    return this.response?.headers.hasOwnProperty("content-encoding")
      ? this.response.headers["content-encoding"]
      : null;
  }

  body(): ResponseType {
    return this.response.data;
  }

  headers(): Record<string, string> {
    return this.response.headers;
  }

  json<T>(): T {
    let buffer = this.response.data;
    if (this.encoded()) buffer = this.decompress();

    const obj: T = JSON.parse(buffer);
    return obj;
  }

  save(path: string) {
    fs.writeFileSync(path, this.response.data);
  }

  base64(): string {
    return this.response.data.toString("base64");
  }
}
