import { Pagination, Sort } from '@nicecactus-platform/graph-ql-service';

export interface Criteria<T> {
    search?: string;
    pagination?: Pagination;
    sort?: Sort<T>;
}
