import { CodeLabel } from '@nicecactus-platform/graph-ql-service';

export interface Profile {
    id?: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    language?: CodeLabel | number;
    currency?: CodeLabel | number;
}
