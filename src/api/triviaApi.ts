import axios from "axios";
import {handleAxiosError} from "./apiError.ts";
import type {Category} from "../models/category.ts";
import type {Question} from "../models/question.ts";

type CategoryResponse = {
    trivia_categories: Category[];
}

type QuestionResponse = {
    response_code: number;
    results: Question[];
}

export async function fetchCategories(): Promise<Category[]> {
    try {
        const response =
            await axios.get<CategoryResponse>('https://opentdb.com/api_category.php');

        return response.data.trivia_categories.map((category: Category) => category);
    } catch (error) {
        throw handleAxiosError(error);
    }
}

export async function fetchQuestions(): Promise<Question[]> {
    try {
        const response =
            await axios.get<QuestionResponse>("https://opentdb.com/api.php?amount=50");
        //console.log(response);

        return response.data.results.map((question: Question) => question);
    }
    catch (error) {
        throw handleAxiosError(error);
    }
}