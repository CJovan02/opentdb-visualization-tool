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