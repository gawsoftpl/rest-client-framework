import { SaveUrlDto } from "../types/Projects/saveUrl.dto";
export declare const ProjectUrl: (client: any) => {
    create: (project_id: string, data: SaveUrlDto) => Promise<import("..").Response>;
    list: (project_id: string, page?: number) => Promise<import("..").Response>;
    get: (project_id: string, url_id: string) => Promise<import("..").Response>;
    remove: (project_id: string, url_id: string) => Promise<import("..").Response>;
    process_again: (project_id: string, url_id: string) => Promise<import("..").Response>;
    download: (url_or_project_url_object: string | {
        completed_file_url: string;
    }, save_path: string) => Promise<import("..").Response>;
};
