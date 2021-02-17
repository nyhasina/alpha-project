import { Criteria, SortOrder } from '@nicecactus-platform/graph-ql-service';

export const DEFAULT_CRITERIA: Criteria<any> = {
    pagination: {
        skip: 0,
        take: 10,
    },
    sort: {
        by: 'id',
        direction: SortOrder.ASC,
    },
    search: '',
};
