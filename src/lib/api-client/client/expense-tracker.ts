import 'server-only'
import backendConfig from '@/lib/config/backend.config';
import ExpenseTrackerBase from './expense-tracker.base'

const expenseTracker = (): ExpenseTrackerBase => {
    const client = new ExpenseTrackerBase(backendConfig.uri);
    return client;
}

export default expenseTracker;