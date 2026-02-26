import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.withCredentials = true;
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError<{ type: string; errors?: Record<string, string>; message?: string }>) => {
        return Promise.reject(error);
    },
);

export default api;