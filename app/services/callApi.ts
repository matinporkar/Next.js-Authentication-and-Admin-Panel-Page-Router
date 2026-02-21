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
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log("user registered");
        return response;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

export default api;