import axios, {
    AxiosError,
    AxiosInstance,
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
    payload?: Object;
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
// Request interceptor for the private instance
// axiosInstance.interceptors.request.use(
//     async (config) => {
//         const { authorizationToken: AUTHORIZE_TOKEN } = readCookies();

//         if ( AUTHORIZE_TOKEN ) {
//             config.headers = {
//                 ...config.headers,
//                 Authorization: `Bearer ${AUTHORIZE_TOKEN}`,
//             };
//         }
    
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// Error handling
// const errorInterceptor = async (error) => {
//     const config = error?.config;

// 	// check if it's a server error
// 	if (!error.response) {
// 		return Promise.reject(error);
// 	}

//     if (error.response) {
//         if ( error?.response?.status === 403 ) {
//             router.push({ name: routeNames.LOGIN });
//         }

//         if (error?.response?.status === 401 && !config?.sent) {
//             config.sent = true;
//             const { refreshToken } = readCookies();
//             await checkRefreshCookieValidity(refreshToken);
//         }

//         return axiosInstance(config);
//     }

// 	return Promise.reject(error);
// }

// Success responses
// const responseInterceptor = (response) => {
// 	return response;
// }

// axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

// Main api function
const apiMethods = (axios: any) => {
	const logger = async (promise: Promise<any>) =>
		promise.catch((error: any) => {
			if (configuration.env !== "development") throw error

			if (error.response) {
				// Any errors
				console.log(error.response)
			} else if (error.request) {
				// No response at all
				console.log(error.request)
			} else {
				// Something else happened that triggered an error
				console.error("Error", error.message)
			}

			console.log(error.config)
			throw error
		})

	return {
		get: (url: string, config?: Options) => logger(axios.get(url, config)),
	}
}

export const api = apiMethods(axiosInstance);
export const apiObject = axiosInstance;