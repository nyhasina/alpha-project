import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TeamModel } from '../team/team.model';

export class CreateMatchInput {
    @Field((returns) => Int)
    teamA: number;

    @Field((returns) => Int)
    teamB: number;

    @Field((returns) => Int)
    round: number;

    constructor(teamA: number, teamB: number, round: number) {
        this.teamA = teamA;
        this.teamB = teamB;
        this.round = round;
    }
}

@ObjectType()
export class MatchModel {
    @Field((returns) => Int)
    id: number;

    @Field((returns) => Int)
    round: number;

    roundId?: number;

    @Field((returns) => TeamModel)
    teamA: TeamModel;

    teamAId?: number;

    @Field((returns) => TeamModel)
    teamB: TeamModel;

    teamBId?: number;
}
