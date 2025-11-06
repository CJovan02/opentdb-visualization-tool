import axios from "axios";
import type {Category} from "../models/category.ts";
import type {Question} from "../models/question.ts";
import {Err, Ok, type Result} from "../utils/result.ts";
import {extractTriviaErrorIfPresent, TriviaApiError} from "./triviaApiError.ts";

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

export async function fetchQuestions(): Promise<Result<Question[]>> {
    try {
        const response =
            await axios.get<QuestionResponse>("https://opentdb.com/api.php?amount=50");

        // Just to make sure, we will check if the response code is 0
        if (response.data.response_code !== 0) {
            return Err.of(new TriviaApiError("Api Error", response.data.response_code))
        }

        return Ok.of(response.data.results.map((question: Question) => question));
    } catch (error) {
        return Err.of(extractTriviaErrorIfPresent(error));
    }
}