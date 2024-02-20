import { AxiosResponse } from "axios";
import { Response } from "../classes";

export const convertAxiosResponse = (
  axiosResponse: AxiosResponse
): Response => {
  return new Response({
    data: axiosResponse.data,
    headers: Object.entries(axiosResponse.headers).reduce(
      (actual, [key, value]) => {
        actual[key] = value;
        return actual;
      },
      {}
    ),
    status: axiosResponse.status,
  });
};
