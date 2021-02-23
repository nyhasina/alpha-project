import { User } from './user.interface';
import { Tag } from './tag.interface';

export interface Team {
    id?: number;
    name?: string;
    tag?: Tag | string;
    owner?: User | number;
    members?: User[];
}
