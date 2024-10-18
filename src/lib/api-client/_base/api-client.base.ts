import ApiClientError from "./api-error";
import { ApiResource } from "./api-resource.type";
import UrlBuilder from "./url-builder";

const parseBody = (body: Record<string, any> | FormData | undefined, method: string, endpoint: string, flag: string = ''): (string | FormData | null) => {
    if (
        !body &&
        !flag.includes('--no-body') &&
        (method === 'POST' || method === 'PATCH' || method === 'PUT')
    ) throw new Error(`(${endpoint}) ${method.toUpperCase()} request must have a body, if not add --no-body flag`);
    return !body
        ? null
        : (body instanceof FormData ? body : JSON.stringify(body));
}
abstract class ApiClientBase<T extends { [key: string]: ApiResource }> {

    private _params: Record<string, string | number> = {};
    private _query: Record<string, string | number | boolean> = {};
    private _header: Record<string, string> = {};
    private readonly _flag: Set<string> = new Set();

    protected _body: Record<string, any> | FormData | undefined = undefined;

    constructor(
        protected readonly endpoints: T,
        protected readonly _baseUrl: string
    ) { }

    /**
     * Adds a element to the request header
     * @param {Record<string, string>} header - Key-value object to add in the header
     * @returns {ApiClientBase} This object
     */
    public addHeader(header: Record<string, string>): this {
        this._header = { ...this._header, ...header };
        return this;
    }

    /**
     * Adds a body to the request
     * @template T - Object that inherits from Record<string, any>
     * @param {T | FormData} body - Data that is request
     * @returns {ApiClientBase} This object
     */
    public addBody<T extends Record<string, any>>(body: T | FormData): this {
        this._body = body;
        return this;
    }

    /**
     * Adds replace the params in the url
     * @param {Record<string, number>} param - Object required to replace any param in the url
     * @returns {ApiClientBase} This object
     */
    public addParams(param: Record<string, string | number>): this {
        this._params = { ...this._params, ...param };
        return this;
    }

    /**
     * Adds a query param in the url
     * @param {Record<string, string | number | boolean>} query - Object required to add in the url as a query param
     * @returns {ApiClientBase} This object
     */
    public addQuery(query: Record<string, string | number | boolean>): this {
        this._query = { ...this._query, ...query };
        return this;
    }

    /**
     * Options that will be checked before the request is done
     * @param {string} value - Options such: --no-body 
     * @returns {ApiClientBase} This object
     */
    public addFlag(value: string): this {
        const values = value.split(/\s+/);
        values.forEach((e) => this._flag.add(e));
        return this;
    }

    /**
     * Executes the fetch
     * @param {T} key - Key required to address the endpoint
     * @returns {Promise<any>} Returns an object
     */
    public async execute(key: keyof T): Promise<any> {
        const endpoint = this.endpoints[key];
        const method: string = endpoint.method.toUpperCase();
        const headers: Headers = new Headers(this._header);
        const flag = Array.from(this._flag).join('');

        if (!endpoint) throw new Error(`No endpoint found for: ${key.toString()}`);

        const url: string = this._buildUrl(endpoint.resource);
        const body = parseBody(this._body, method, endpoint.resource, flag);
        const options: RequestInit = { method, headers, body };

        const request = this._instanceRequest(url, options);
        const response = await fetch(request);

        try {
            if (!response.ok) {
                const errorData = await response.json();
                console.error(errorData);
                throw new ApiClientError(method, response);
            }

            const contentType = response.headers.get('content-type') || '';
            return contentType.includes('application/json')
                ? response.json()
                : (contentType.includes('text') ? response.text() : response.blob());
        } catch (error) {
            throw error;
        } finally {
            this._resetState();
        }

    }

    /**
     * Creates the request object
     * @param {string} url - Url for the request
     * @param {RequestInit} init - Object required to do the fetch
     * @returns {Request} A request object for the fetch api
     */
    private _instanceRequest(url: string, init: RequestInit): Request {
        return new Request(url, {
            ...init,
            method: init.method,
            body: init.method === 'GET' ? null : init.body,
            duplex: init.body ? 'half' : undefined,
        } as RequestInit);
    }

    /**
     * Reset the object state
     */
    private _resetState() {
        this._query = {};
        this._params = {};
        this._header = {};
        this._flag.clear();
        this._body = undefined;
    }

    /**
     * Checks if the client is used in the server or client context
     * @returns {boolean} True if is on server or false if is on client
     */
    protected _isServerContext(): boolean {
        return typeof window === 'undefined';
    }

    /**
     * Builds the URL replacing the params or adding the query param
     * @param {string} endpoints - Enpoint required to join the baseUrl
     * @returns {string} Processed the url, all the params and query are already applied
     */
    protected _buildUrl(endpoints: string): string {
        return UrlBuilder
            .builder(`${this._baseUrl}/${endpoints}`)
            .param(this._params)
            .query(this._query)
            .build();
    }
}

export default ApiClientBase;