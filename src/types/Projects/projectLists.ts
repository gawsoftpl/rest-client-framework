import { ProjectType } from "./project.type";
import { PaginationType } from "../pagination.type";

export type ProjectLists = {
  projects: Array<ProjectType>;
  pagination: PaginationType;
};
