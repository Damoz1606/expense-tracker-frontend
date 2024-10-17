'use server'

import expenseTracker from "@/lib/api-client/client/expense-tracker";
import auth from "@/lib/auth/auth";

export interface UserRequest {
    email: string;
    password: string;
    username: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
}

/**
 * Creates a user and its credentials
 * @param {UserRequest} data - Data required to create the user
 */
export const userCreate = async (data: UserRequest): Promise<void> => {
    await expenseTracker()
        .addBody(data)
        .execute('userCreate');
}

/**
 * Retrive the information of the current logged user
 * @returns {User} Logged user information
 */
export const retriveMe = async (): Promise<User> => {
    const session = await auth();
    const data: User = await expenseTracker()
        .addToken(session.token)
        .execute('retriveMe');
    return data;
}