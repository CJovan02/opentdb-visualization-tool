import type {Category} from "../models/category.ts";
import {fetchCategories} from "../api/triviaApi.ts";

export async function getTriviaCategories(): Promise<Category[]> {
    return await fetchCategories();
}