import axios, {AxiosInstance} from "axios";
import config from "./config.ts";
import {memoizedRefreshToken} from "./refreshToken";

const api: AxiosInstance = axios.create({
    baseURL: config.api,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    async (config) => {
        const accessToken: string | null = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers.set('authorization', accessToken);
        }

        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error?.config;

        if ((error?.response?.status === 401 || error?.response?.status === 403) && error?.response?.data?.message === "jwt expired" && !config?.sent) {
            config.sent = true;

            const result = await memoizedRefreshToken();

            if (result?.accessToken) {
                config.headers = {
                    ...config.headers,
                    authorization: result?.accessToken,
                };
            }

            return axios(config);
        }

        return Promise.reject(error);
    }
);

api.interceptors.response.use(function (response) {
    return response?.data ?? response;
});

export default api;
