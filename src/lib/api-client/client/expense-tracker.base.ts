import 'server-only'
import endpoints from './endpoints';
import ApiClientBase from '../_base/api-client.base';

type ExpenseTrackerMethod = typeof endpoints;
class TrackerClient extends ApiClientBase<ExpenseTrackerMethod> {
    constructor(baseUrl: string) {
        super(endpoints, baseUrl);
    }

    public addToken(token: string): this {
        this.addHeader({"authorization": `Bearer ${token}`});
        return this;
    }
}

export default TrackerClient;