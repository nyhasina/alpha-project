import { now } from '@nicecactus-platform/graph-ql-service';
import { Match, Round, Tournament } from '../interfaces/tournament.interface';

export const EMPTY_MATCH: Match = {
    id: null,
    teamA: null,
    teamB: null,
};

export const EMPTY_ROUND: Round = {
    id: null,
    rank: null,
    matchs: [],
};

export const EMPTY_TOURNAMENT: Tournament = {
    id: null,
    name: null,
    date: now,
    closed: false,
    tournamentType: null,
    rules: [],
    format: null,
    teams: [],
    rounds: [],
};
