import backendConfig from '@/lib/config/backend.config';
import ExpenseTrackerBase from './expense-tracker.base'

const expenseTracker = (): ExpenseTrackerBase => {
    if (typeof window !== undefined) throw new Error('Expense Tracker can only instantiated on the server.');
    const client = new ExpenseTrackerBase(backendConfig.uri);
    return client;
}

export default expenseTracker;