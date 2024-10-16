'use server'

import expenseTracker from "@/lib/api-client/client/expense-tracker";
import auth from "@/lib/auth/auth";

export interface UserCreate {
    email: string;
    password: string;
    username: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
}

export const userCreate = async (data: UserCreate): Promise<void> => {
    const session = await auth();
    await expenseTracker()
        .addBody(data)
        .addToken(session.token)
        .execute('userCreate');
}

export const retriveMe = async (): Promise<User> => {
    const session = await auth();
    const data: User = await expenseTracker()
        .addToken(session.token)
        .execute('retriveMe');
    return data;
}