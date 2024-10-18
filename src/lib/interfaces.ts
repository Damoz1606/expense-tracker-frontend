export interface ArrayResponse<T> {
    data: T[];
}

export interface PageMeta {
    skip: number;
    take: number;
}

export interface FilterMeta {
    filter: string;
}

export interface ExtraMeta {
    extras: any
}

export type SearchQuery = PageMeta & Partial<FilterMeta> & Partial<ExtraMeta>;
export type CountQuery = Omit<PageMeta, 'skip'> & Partial<FilterMeta> & Partial<ExtraMeta>;

export interface PageCount {
    pages: number
}