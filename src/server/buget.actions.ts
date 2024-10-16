'use server'

import expenseTracker from "@/lib/api-client/client/expense-tracker";
import auth from "@/lib/auth/auth";
import { ArrayResponse } from "@/lib/interfaces";

export interface BudgetActivity {
    id: number,
    name: string,
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
    }
}

export interface BudgetRequest {
    name: string,
    budget: number
}

export const budgetRetriveActivity = async (): Promise<BudgetActivity[]> => {
    const session = await auth();
    const { data }: ArrayResponse<BudgetActivity> = await expenseTracker()
        .addToken(session.token)
        .execute('budgetRetriveActivity');
    return data;
}

export const budgetCreate = async (data: BudgetRequest): Promise<void> => {
    const session = await auth();
    await expenseTracker()
        .addToken(session.token)
        .addBody(data)
        .execute('budgetCreate');
}

export const budgetRetriveArray = async (): Promise<Budget[]> => {
    const session = await auth();
    const { data }: ArrayResponse<Budget> = await expenseTracker()
        .addToken(session.token)
        .execute('budgetRetriveArray');
    return data;
}

export const budgetRetrive = async (): Promise<BudgetWithExpenses> => {
    const session = await auth();
    const data: BudgetWithExpenses = await expenseTracker()
        .addToken(session.token)
        .execute('budgetRetrive');
    return data;
}

export const budgetUpdate = async (id: number, body: BudgetRequest): Promise<void> => {
    const session = await auth();
    await expenseTracker()
        .addToken(session.token)
        .addParams({ id })
        .addBody(body)
        .execute('budgetUpdate');
}

export const budgetDelete = async (id: number) => {
    const session = await auth();
    await expenseTracker()
        .addToken(session.token)
        .addParams({ id })
        .execute('budgetDelete');
}