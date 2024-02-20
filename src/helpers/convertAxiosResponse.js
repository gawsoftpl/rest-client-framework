"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertAxiosResponse = void 0;
const classes_1 = require("../classes");
const convertAxiosResponse = (axiosResponse) => {
    return new classes_1.Response({
        data: axiosResponse.data,
        headers: Object.entries(axiosResponse.headers).reduce((actual, [key, value]) => {
            actual[key] = value;
            return actual;
        }, {}),
        status: axiosResponse.status,
    });
};
exports.convertAxiosResponse = convertAxiosResponse;
//# sourceMappingURL=convertAxiosResponse.js.map