export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export interface Sort<T> {
    orderBy?: keyof T;
    direction?: SortOrder;
}
