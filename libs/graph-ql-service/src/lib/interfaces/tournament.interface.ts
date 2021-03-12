import { Format, Rule, Team, TournamentType } from '@nicecactus-platform/graph-ql-service';

export interface Round {
    id: number;
    rank?: number;
    matchs?: Match[] | number[];
}

export interface Match {
    id: number;
    teamA?: Team | number;
    teamB?: Team | number;
}

export interface Tournament {
    id?: number;
    name?: string;
    date?: string;
    closed?: boolean;
    tournamentType?: number | TournamentType;
    rules?: number[] | Rule;
    format?: number | Format;
    teams?: number[] | Team[];
    rounds?: number[] | Round[];
}
