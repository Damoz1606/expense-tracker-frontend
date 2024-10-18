import 'server-only'
import backendConfig from '@/lib/config/backend.config';
import ExpenseTrackerBase from './expense-tracker.base'

/**
 * Api client that connects enable connection to Expense Tracker backend
 * @returns {ExpenseTrackerBase} ExpenseTrackerBase api client
 */
const expenseTracker = (): ExpenseTrackerBase => {
    const client = new ExpenseTrackerBase(backendConfig.uri);
    return client;
}

export default expenseTracker;