import { CodeLabel } from '../interfaces/code-label.interface';
import { Criteria } from '../interfaces/criteria.interface';
import { SortOrder } from '../interfaces/sort.interface';

export const DEFAULT_CRITERIA: Criteria<any> = {
    pagination: {
        skip: 1,
        take: 10,
    },
    sort: {
        by: 'id',
        direction: SortOrder.ASC,
    },
    search: '',
};

export const EMPTY_CODE_LABEL: CodeLabel = {
    id: null,
    code: null,
    label: null,
};
