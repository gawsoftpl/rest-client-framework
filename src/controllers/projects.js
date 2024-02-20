"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projects = void 0;
const executor_1 = require("../classes/executor");
const Projects = (client) => {
    return {
        create: async (project) => {
            return await (0, executor_1.executor)(client, {
                path: `/projects`,
                data: project,
                method: "POST",
                acceptCode: [201],
            });
        },
        update: async (project_id, project) => {
            return await (0, executor_1.executor)(client, {
                path: `/projects/${project_id}`,
                data: project,
                method: "PATCH",
            });
        },
        get: (project_id) => {
            return (0, executor_1.executor)(client, {
                path: `/projects/${project_id}`,
                method: "GET",
            });
        },
        list: (page = 1) => {
            return (0, executor_1.executor)(client, {
                path: `/projects/?page=${page}`,
                method: "GET",
            });
        },
        remove: (project_id) => {
            return (0, executor_1.executor)(client, {
                path: `/projects/${project_id}`,
                method: "DELETE",
            });
        },
    };
};
exports.Projects = Projects;
//# sourceMappingURL=projects.js.map