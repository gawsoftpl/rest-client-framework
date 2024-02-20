/// <reference types="node" />
import { ResponseInterface } from "../interfaces/response.interface";
import { LibraryResponseInterface } from "../interfaces/LibraryResponse.interface";
export declare class Response implements ResponseInterface {
    private response;
    constructor(response: LibraryResponseInterface);
    fileType(): string;
    setResponse(response: LibraryResponseInterface): void;
    status(): number;
    decompress(): any;
    contentType(): string;
    encoded(): string;
    body(): Buffer;
    headers(): Record<string, string>;
    json<T>(): T;
    save(path: string): void;
    base64(): string;
}
