import { SaveProjectDto } from "../types/Projects/saveProject.dto";
import { executor } from "../classes/executor";
import { Response } from "../classes/response";

export const Projects = (client) => {
  return {
    create: async (project: SaveProjectDto): Promise<Response> => {
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
    ): Promise<Response> => {
      return await executor(client, {
        path: `/projects/${project_id}`,
        data: project,
        method: "PATCH",
      });
    },
    get: (project_id: string): Promise<Response> => {
      return executor(client, {
        path: `/projects/${project_id}`,
        method: "GET",
      });
    },
    list: (page = 1): Promise<Response> => {
      return executor(client, {
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
