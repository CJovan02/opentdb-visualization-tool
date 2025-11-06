import axios from "axios";
import type {Category} from "../models/category.ts";
import type {Question} from "../models/question.ts";
import {Err, Ok, type Result} from "../utils/result.ts";
import {extractTriviaErrorIfPresent, getTriviaErrorMessage, TriviaApiError} from "./triviaApiError.ts";

type CategoryResponse = {
    trivia_categories: Category[];
}

type QuestionResponse = {
    response_code: number;
    results: Question[];
}

export async function fetchCategories(): Promise<Result<Category[]>> {
    try {
        const response =
            await axios.get<CategoryResponse>('https://opentdb.com/api_category.php');

        return Ok.of(response.data.trivia_categories.map((category: Category) => category));
    } catch (error) {
        return Err.of(extractTriviaErrorIfPresent(error))
    }
}

// Pass in category in order to filter by it, if it's null it means 'any category'
export async function fetchQuestions(categoryId?: number): Promise<Result<Question[]>> {
    try {
        let requestUrl = "https://opentdb.com/api.php?amount=50"
        if (categoryId) {
            requestUrl += "&category=" + categoryId;
        }

        const response =
            await axios.get<QuestionResponse>(requestUrl, {});

        // Just to make sure, we will check if the response code is 0
        if (response.data.response_code !== 0) {
            return Err.of(
                new TriviaApiError(getTriviaErrorMessage(response.data.response_code), response.data.response_code
            ))
        }

        return Ok.of(response.data.results.map((question: Question) => question));
    } catch (error) {
        return Err.of(extractTriviaErrorIfPresent(error));
    }
}