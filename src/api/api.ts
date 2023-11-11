import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse
} from "axios";
import configuration from "./appConfig";

// ***
// * General configuration for Axios instance
// ***

interface Options {
    url: string;
    customHeaders?: any;
    payload?: object;
}

const getHeaders = (customHeaders: any) => {
    return {
        headers: {
            ...customHeaders,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        baseURL: configuration.baseUrl,
    };
};

// Axios instance
const axiosInstance = axios.create(getHeaders({}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requestInterceptor = (req: AxiosRequestConfig): AxiosRequestConfig => {
    return req;
};
  
const successInterceptor = (res: AxiosResponse): AxiosResponse => {
    return res;
};
  
const errorInterceptor = (err: AxiosError) => {
    return Promise.reject(err);
};

// axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(
    (res) => successInterceptor(res),
    (err) => errorInterceptor(err)
);

// Main api function

const apiMethods = (axios: any) => {
    const logger = async (promise: Promise<any>) =>
        promise.catch((error: any) => {
            if (configuration.env !== "development") throw error;

            if (error.response) {
                // Any errors
                console.log(error.response);
            } else if (error.request) {
                // No response at all
                console.log(error.request);
            } else {
                // Something else happened that triggered an error
                console.error("Error", error.message);
            }

            console.log(error.config);
            throw error;
        });

    return {
        get: (url: string, config?: Options) => logger(axios.get(url, config)),
    };
};

export const api = apiMethods(axiosInstance);
export const apiObject = axiosInstance;