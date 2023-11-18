import axios from "axios";
import configuration from "../app/appConfig";

const getHeaders = (customHeaders = {}) => {
    return {
        ...customHeaders,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
};

export const createAxiosInstance = (customHeaders: any) => {
    return axios.create({
        baseURL: configuration.baseUrl,
        headers: getHeaders(customHeaders),
    });
};
