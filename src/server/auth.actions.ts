'use server'

import expenseTracker from "@/lib/api-client/client/expense-tracker";

export const validateCredential = async (key: string): Promise<boolean> => {
    try {
        await expenseTracker().addParams({ key }).execute('validateCode');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}