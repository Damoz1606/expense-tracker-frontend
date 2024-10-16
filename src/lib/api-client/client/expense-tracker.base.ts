import 'server-only'
import endpoints from './endpoints';
import ApiClientBase from '../_base/api-client.base';

type ExpenseTrackerMethod = typeof endpoints;
class TrackerClient extends ApiClientBase<ExpenseTrackerMethod> {
    constructor(baseUrl: string) {
        super(endpoints, baseUrl);
    }

    public execute(key: keyof ExpenseTrackerMethod): Promise<any> {
        this.addHeader({ 'content-type': 'application/json' });
        return super.execute(key);
    }

    /**
     * Add an authentication token to the request
     * @param {string} token - Authorization token
     * @returns This object
     */
    public addToken(token: string): this {
        this.addHeader({ "authorization": `Bearer ${token}` });
        return this;
    }
}

export default TrackerClient;