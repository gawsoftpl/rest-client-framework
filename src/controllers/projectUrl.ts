import { SaveUrlDto } from "../types/Projects/saveUrl.dto";
import { executor } from "../classes/executor";

export const ProjectUrl = (client) => {
  return {
    create: (project_id: string, data: SaveUrlDto) => {
      return executor(client, {
        path: `/projects/${project_id}/urls`,
        data: data,
        method: "POST",
        acceptCode: [201],
      });
    },
    list: (project_id: string, page = 1) => {
      return executor(client, {
        path: `/projects/${project_id}/urls`,
        data: {
          page,
        },
        method: "GET",
      });
    },
    get: (project_id: string, url_id: string) => {
      return executor(client, {
        path: `/projects/${project_id}/urls/${url_id}`,
        method: "GET",
      });
    },
    remove: (project_id: string, url_id: string) => {
      return executor(client, {
        path: `/projects/${project_id}/urls/${url_id}`,
        method: "DELETE",
      });
    },
    process_again: (project_id: string, url_id: string) => {
      return executor(client, {
        path: `/projects/${project_id}/urls/${url_id}/process_again`,
        method: "POST",
      });
    },
    download: async (
      url_or_project_url_object: string | { completed_file_url: string },
      save_path: string,
    ) => {
      let url;

      if (typeof url_or_project_url_object === "string") {
        url = url_or_project_url_object;
      } else {
        url = url_or_project_url_object.completed_file_url;
      }

      return executor(client, {
        path: url,
        method: "GET",
        save_to: save_path,
      });
    },
  };
};
