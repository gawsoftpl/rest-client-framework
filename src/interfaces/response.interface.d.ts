/// <reference types="node" />
import { LibraryResponseInterface } from "./LibraryResponse.interface";
export interface ResponseInterface {
    contentType(): string;
    status(): number;
    encoded(): string;
    body(): Buffer;
    headers(): Record<string, string>;
    base64(): string;
    save(path: string): any;
    json<T>(): T;
    setResponse(response: LibraryResponseInterface): any;
}
