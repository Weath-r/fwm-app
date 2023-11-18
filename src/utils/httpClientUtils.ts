import axios from "axios";
import configuration from "../app/appConfig";

type CustomeHeaders = {
    [key: string]: string;
};

const getHeaders = (customHeaders: CustomeHeaders) => {
    return {
        ...customHeaders,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
};

export const createAxiosInstance = (customHeaders: CustomeHeaders = {}) => {
    return axios.create({
        baseURL: configuration.baseUrl,
        headers: getHeaders(customHeaders),
    });
};
