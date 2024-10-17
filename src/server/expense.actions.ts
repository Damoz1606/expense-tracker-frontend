import expenseTracker from "@/lib/api-client/client/expense-tracker";
import auth from "@/lib/auth/auth";
import { ArrayResponse } from "@/lib/interfaces";
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

export const expenseCreate = async (body: ExpenseRequest): Promise<void> => {
    const session = await auth();
    await expenseTracker()
        .addToken(session.token)
        .addBody(body)
        .execute('expenseCreate');
    revalidatePath(`/app/budgets/${body.budget}`);
}

export const expenseRetrive = async () => {
    const session = await auth();
    const { data }: ArrayResponse<Expense> = await expenseTracker()
        .addToken(session.token)
        .execute('expenseRetrive');
    return data;
}

export const expenseLastest = async () => {
    const session = await auth();
    const { data }: ArrayResponse<Expense> = await expenseTracker()
        .addToken(session.token)
        .execute('expenseLastest');
    return data;
}

export const expenseDelete = async (id: number): Promise<void> => {
    const session = await auth();
    await expenseTracker()
        .addToken(session.token)
        .addParams({ id })
        .execute('expenseDelete');
    revalidatePath(`/app/budgets/*`);
    revalidatePath(`/app/expenses`);
}
