import axios, { AxiosInstance,  AxiosResponse } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
    responseType: "json",
    validateStatus: (status: number) => status >= 200 && status < 300,
    headers: {
        "Content-Type": "application/json",
        locale: "en",
    },
});

enum HttpStatusCode {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500
}


const handleApiError = (failedRequest: AxiosResponse): void => {
    const statusCode = failedRequest.status;
    const statusText = failedRequest.statusText;
    console.error(`Error ${statusCode}: ${statusText}`, failedRequest.data);
}

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (failedRequest: AxiosResponse) => {
        if (failedRequest.status in HttpStatusCode) {
            handleApiError(failedRequest);
        } else {
            console.error("Unhandled Error", failedRequest.data);
        }
        return Promise.reject(failedRequest);
    }
);