import { LibraryResponseInterface } from "./LibraryResponse.interface";

export interface ResponseInterface<ResponseType> {
  contentType(): string;
  status(): number;
  encoded(): string;
  body(): ResponseType;
  headers(): Record<string, string>;
  base64(): string;
  save(path: string);
  json<T>(): T;
  setResponse(response: LibraryResponseInterface);
}
