import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MatchModel } from '../match/match.model';
import { TournamentModel } from '../tournament/tournament.model';

@ObjectType()
export class RoundModel {
    @Field((returns) => Int)
    id: number;

    @Field((returns) => Int)
    rank: number;

    tournamentId?: number;

    @Field((returns) => [MatchModel])
    matchs: MatchModel[];
}
