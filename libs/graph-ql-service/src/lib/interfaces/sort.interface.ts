export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export interface Sort<T> {
    by?: keyof T;
    direction?: SortOrder;
}
