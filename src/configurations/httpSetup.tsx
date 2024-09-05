import axios, { AxiosResponse, AxiosError } from "axios";
import config from "./index";

const { apiHost } = config().secrets;

const customAxios = axios.create({
    baseURL: `${apiHost}`,
    // timeout: 30000,
});

const responseHandler = (response: AxiosResponse): AxiosResponse => {
    if (response?.status === 403) {
        localStorage.clear();
        window.location.href = "/";
    }
    return response;
};

const errorHandler = (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 403) {
        localStorage.clear();
        window.location.href = "/";
    }
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (request: any) => {
        const token = `Bearer ${localStorage.getItem("token") || ""}`;
        if (token) {
            request.headers = {
                ...request.headers,
                Authorization: token,
            };
        }

        return request;
    },
    (error: AxiosError) => Promise.reject(error)
);

customAxios.interceptors.response.use(
    (response: AxiosResponse) => responseHandler(response),
    (error: AxiosError) => errorHandler(error)
);

// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;