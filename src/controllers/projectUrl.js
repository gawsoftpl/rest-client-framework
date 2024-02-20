"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectUrl = void 0;
const executor_1 = require("../classes/executor");
const ProjectUrl = (client) => {
    return {
        create: (project_id, data) => {
            return (0, executor_1.executor)(client, {
                path: `/projects/${project_id}/urls`,
                data: data,
                method: "POST",
                acceptCode: [201],
            });
        },
        list: (project_id, page = 1) => {
            return (0, executor_1.executor)(client, {
                path: `/projects/${project_id}/urls`,
                data: {
                    page,
                },
                method: "GET",
            });
        },
        get: (project_id, url_id) => {
            return (0, executor_1.executor)(client, {
                path: `/projects/${project_id}/urls/${url_id}`,
                method: "GET",
            });
        },
        remove: (project_id, url_id) => {
            return (0, executor_1.executor)(client, {
                path: `/projects/${project_id}/urls/${url_id}`,
                method: "DELETE",
            });
        },
        process_again: (project_id, url_id) => {
            return (0, executor_1.executor)(client, {
                path: `/projects/${project_id}/urls/${url_id}/process_again`,
                method: "POST",
            });
        },
        download: async (url_or_project_url_object, save_path) => {
            let url;
            if (typeof url_or_project_url_object === "string") {
                url = url_or_project_url_object;
            }
            else {
                url = url_or_project_url_object.completed_file_url;
            }
            return (0, executor_1.executor)(client, {
                path: url,
                method: "GET",
                save_to: save_path,
            });
        },
    };
};
exports.ProjectUrl = ProjectUrl;
//# sourceMappingURL=projectUrl.js.map