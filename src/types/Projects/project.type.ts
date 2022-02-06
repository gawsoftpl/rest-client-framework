import { ProjectStatus } from "./project_status.type";

export type ProjectType = {
  id: string;
  added: Date;
  updated: Date;
  name: string;
  status: ProjectStatus;
};
