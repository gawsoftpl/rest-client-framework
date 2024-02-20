import { ProjectStatus } from "./project_status.type";
export type SaveProjectDto = {
    name: string;
    status?: ProjectStatus;
};
