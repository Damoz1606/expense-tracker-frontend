import expenseTracker from "@/lib/api-client/client/expense-tracker";
import auth from "@/lib/auth/auth";
import { ArrayResponse } from "@/lib/interfaces";

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

export const expenseCreate = async (body: ExpenseRequest): Promise<void> => {
    const session = await auth();
    await expenseTracker()
        .addToken(session.token)
        .addBody(body)
        .execute('expenseCreate');
}

export const expenseRetrive = async () => {
    const session = await auth();
    const { data }: ArrayResponse<Expense> = await expenseTracker()
        .addToken(session.token)
        .execute('expenseCreate');
    return data;
}

export const expenseLastest = async () => {
    const session = await auth();
    const { data }: ArrayResponse<Expense> = await expenseTracker()
        .addToken(session.token)
        .execute('expenseCreate');
    return data;
}

export const expenseDelete = async (id: number): Promise<void> => {
    const session = await auth();
    await expenseTracker()
        .addToken(session.token)
        .addParams({ id })
        .execute('expenseCreate');
}
