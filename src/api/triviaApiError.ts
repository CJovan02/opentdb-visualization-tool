import axios, {AxiosError} from "axios";

export class TriviaApiError extends Error {
    // Status code
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "TriviaApiError";
        this.status = status;
    }
}

// When there is api error trivia will return status code.
// Using axios, this is the way to extract that responseCode and map it custom error object
// This is the only error that we want to handle, this is the only expected error.
export function extractTriviaErrorIfPresent(error: unknown): TriviaApiError {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        const data = error.response?.data;
        const triviaCode = data?.response_code;
        if (triviaCode !== undefined) {
            return new TriviaApiError(axiosError.message, triviaCode);
        }
    }

    throw error;
}

export function getTriviaErrorMessage(code: number): string {
    switch (code) {
        case 0:
            return "Success: The request returned results successfully.";
        case 1:
            return "No results: The API doesn't have enough questions for your query.";
        case 2:
            return "Invalid parameter: One or more parameters are not valid.";
        case 3:
            return "Token not found: Your session token does not exist.";
        case 4:
            return "Token empty: All possible questions for this query have been returned. You need to reset your token.";
        case 5:
            return "Rate limit reached: Too many requests. Please wait a few seconds before trying again.";
        default:
            return "Unknown error: An unexpected error occurred.";
    }
}

