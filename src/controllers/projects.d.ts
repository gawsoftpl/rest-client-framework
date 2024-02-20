import { SaveProjectDto } from "../types/Projects/saveProject.dto";
import { Response } from "../classes/response";
export declare const Projects: (client: any) => {
    create: (project: SaveProjectDto) => Promise<Response>;
    update: (project_id: string, project: SaveProjectDto) => Promise<Response>;
    get: (project_id: string) => Promise<Response>;
    list: (page?: number) => Promise<Response>;
    remove: (project_id: string) => Promise<Response>;
};
