import { SaveProjectDto } from "../types/Projects/saveProject.dto";
import { executor } from "../classes/method";
import { Response } from "../classes/response";
import { ProjectType } from "../types/Projects/project.type";

export default (client) => {
  return {
    create: async (project: SaveProjectDto): Promise<Response<ProjectType>> => {
      return await executor(client, {
        path: `/projects`,
        data: project,
        method: "POST",
        acceptCode: [201],
      });
    },
    update: async (
      project_id: string,
      project: SaveProjectDto
    ): Promise<Response<ProjectType>> => {
      return await executor<ProjectType>(client, {
        path: `/projects/${project_id}`,
        data: project,
        method: "PATCH",
      });
    },
    get: (project_id: string): Promise<Response<ProjectType>> => {
      return executor<ProjectType>(client, {
        path: `/projects/${project_id}`,
        method: "GET",
      });
    },
    list: (page = 1): Promise<Response<ProjectType[]>> => {

      return executor<ProjectType[]>(client, {
        path: `/projects/?page=${page}`,
        method: "GET",
      });
    },
    remove: (project_id: string): Promise<Response> => {
      return executor(client, {
        path: `/projects/${project_id}`,
        method: "DELETE",
      });
    },
  };
};
