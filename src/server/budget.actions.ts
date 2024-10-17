'use server'

import expenseTracker from "@/lib/api-client/client/expense-tracker";
import auth from "@/lib/auth/auth";
import { ArrayResponse } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";

export interface BudgetActivity {
    id: number,
    name: string,
    items: number;
    budget: number,
    spend: number
}

export interface Budget {
    id: number,
    name: string,
    budget: number,
}

export interface BudgetWithExpenses extends Budget {
    expenses: {
        id: number,
        name: string,
        amount: number,
        createAt: Date
    }[]
}

export interface BudgetRequest {
    name: string,
    budget: number
}

/**
 * Retrives all the budget activities from the logged user
 * @returns {Array<BudgetActivity>} Array of BudgetActivity elements
 */
export const budgetRetriveActivity = async (): Promise<BudgetActivity[]> => {
    const session = await auth();
    const { data }: ArrayResponse<BudgetActivity> = await expenseTracker()
        .addToken(session.token)
        .execute('budgetRetriveActivity');
    return data;
}

/**
 * Creates a budget with the given data
 * @param {BudgetRequest} data - Data required to create a budget
 * @returns {Promise<Budget>} Element of type budged inside a promise
 */
export const budgetCreate = async (data: BudgetRequest): Promise<Budget> => {
    const session = await auth();
    const budget: Budget = await expenseTracker()
        .addToken(session.token)
        .addBody(data)
        .execute('budgetCreate');
    revalidatePath('/app/budgets');
    revalidatePath('/app/home');
    return budget;
}

/**
 * Retrives all the budgets of the logged user
 * @returns {Promise<Array<Budget>>} Array of Budget element inside a promise
 */
export const budgetRetriveArray = async (): Promise<Budget[]> => {
    const session = await auth();
    const { data }: ArrayResponse<Budget> = await expenseTracker()
        .addToken(session.token)
        .execute('budgetRetriveArray');
    return data;
}

/**
 * Retrive a budget by it given id
 * @param {number} id - Unique identifier of a budget
 * @returns {Promise<BudgetWithExpenses>} Element of type BudgetWithExpenses inside a promise
 */
export const budgetRetrive = async (id: number): Promise<BudgetWithExpenses> => {
    const session = await auth();
    const data: BudgetWithExpenses = await expenseTracker()
        .addToken(session.token)
        .addParams({ id })
        .execute('budgetRetrive');
    return data;
}

/**
 * Updates a budget by it id and the given data
 * @param {number} id - Unique identifier of a budget
 * @param {BudgetRequest} body - Data required to update a budget
 */
export const budgetUpdate = async (id: number, body: BudgetRequest): Promise<void> => {
    const session = await auth();
    await expenseTracker()
        .addToken(session.token)
        .addParams({ id })
        .addBody(body)
        .execute('budgetUpdate');
    revalidatePath('/app/budgets');
    revalidatePath('/app/home');
}

/**
 * Delete a budget from the database
 * @param {number} id - Unique identifier of a budget
 */
export const budgetDelete = async (id: number) => {
    const session = await auth();
    await expenseTracker()
        .addToken(session.token)
        .addParams({ id })
        .execute('budgetDelete');
}