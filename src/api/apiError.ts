import axios, {AxiosError} from "axios";

export interface ApiError {
    // Api error message
    message: string;
    // Status code
    status?: number;
    // Axios error response data
    data?: unknown;
}

export function handleAxiosError(error: unknown): ApiError | unknown {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (axiosError.response) {
            return {
                message: axiosError.message,
                status: axiosError.response.status,
                data: axiosError.response.data,
            } as ApiError;
        }

        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        if (axiosError.request) {
            return {
                message: "No response from server",
            } as ApiError;
        }

        return {message: axiosError.message} as ApiError;
    }

    return error;
}