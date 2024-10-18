'use server'

import expenseTracker from "@/lib/api-client/client/expense-tracker";
import auth from "@/lib/auth/auth";
import { ArrayResponse, CountQuery, PageCount, SearchQuery } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";

export interface ExpenseRequest {
    name: string,
    amount: number,
    budget: number
}

export interface Expense {
    id: number,
    name: string,
    amount: number,
    budget: string,
    createAt: Date
}

/**
 * Creates a expense element with the given information
 * @param {ExpenseRequest} body - Data requiere to create an expense element
 */
export const expenseCreate = async (body: ExpenseRequest): Promise<void> => {
    const session = await auth();
    await expenseTracker()
        .addToken(session.token)
        .addBody(body)
        .execute('expenseCreate');
    revalidatePath(`/app/budgets/${body.budget}`);
}

/**
 * Retrives all the expense object associated to the logged user
 * @returns {Array<Expense>} Array of expense objects
 */
export const expenseRetrive = async (): Promise<Expense[]> => {
    const session = await auth();
    const { data }: ArrayResponse<Expense> = await expenseTracker()
        .addToken(session.token)
        .execute('expenseRetrive');
    return data;
}

/**
 * Retrives the latest expense objects associated to the logged user
 * @returns {Array<Expense>} Array of expense objects
 */
export const expenseLastest = async (): Promise<Expense[]> => {
    const session = await auth();
    const { data }: ArrayResponse<Expense> = await expenseTracker()
        .addToken(session.token)
        .execute('expenseLastest');
    return data;
}

/**
 * Removes a expense element from the database
 * @param {number} id - Unique identifier of a expense
 */
export const expenseDelete = async (id: number): Promise<void> => {
    const session = await auth();
    await expenseTracker()
        .addToken(session.token)
        .addParams({ id })
        .execute('expenseDelete');
    revalidatePath(`/app/home`);
    revalidatePath(`/app/budgets/*`);
    revalidatePath(`/app/expenses`);
}

/**
 * Search expenses by a given filter and paginate it
 * @param query - Query values
 * @returns Array expenses into a promise
 */
export const expenseSearch = async (query: SearchQuery): Promise<Expense[]> => {
    console.log(query);
    const session = await auth();
    const { data }: ArrayResponse<Expense> = await expenseTracker()
        .addToken(session.token)
        .addParams({ key: 'expense' })
        .addQuery({ ...query })
        .execute('searchFilter');
    return data;
}

/**
 * 
 * @param query - Query values
 * @returns 
 */
export const expensePageCount = async (query: CountQuery): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await expenseTracker()
        .addToken(session.token)
        .addParams({ key: 'expense' })
        .addQuery({ ...query })
        .execute('searchCount');
    return pages;
}