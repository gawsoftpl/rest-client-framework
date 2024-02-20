import { HttpType } from "./http.type";
export declare class MethodType {
    path?: string;
    data?: Record<string, any>;
    save_to?: string;
    method: keyof HttpType;
    acceptCode?: Array<number>;
}
