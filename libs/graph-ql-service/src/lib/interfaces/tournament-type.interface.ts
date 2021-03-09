import { TournamentReward } from '@nicecactus-platform/graph-ql-service';

export interface TournamentType {
    id?: number;
    name?: string;
    reward?: TournamentReward | number;
}
