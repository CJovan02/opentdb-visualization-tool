import axios from "axios";
import {handleAxiosError} from "./apiError.ts";
import type {Category} from "../models/category.ts";

interface CategoryResponse {
    trivia_categories: Category[];
}

export async function fetchCategories():Promise<Category[]> {
    try {
        const response = await axios.get<CategoryResponse>('https://opentdb.com/api_category.php');

        return response.data.trivia_categories.map((category: Category) => category);
    } catch (error) {
        throw handleAxiosError(error);
    }
}