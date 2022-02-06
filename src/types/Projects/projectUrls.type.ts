import { ProjectUrlType } from "./projectUrl.type";
import { PaginationType } from "../pagination.type";

export type ProjectUrlsType = {
  urls: Array<ProjectUrlType>;
  pagination: PaginationType;
};
