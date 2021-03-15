import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RoundModel } from '../round/round.model';
import { TeamModel } from '../team/team.model';

export class CreateMatchInput {
    @Field((returns) => Int, { nullable: true })
    teamA?: number;

    @Field((returns) => Int, { nullable: true })
    teamB?: number;

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

    @Field((returns) => RoundModel)
    round: RoundModel;

    roundId?: number;

    @Field((returns) => TeamModel, { nullable: true })
    teamA?: TeamModel;

    teamAId?: number;

    @Field((returns) => TeamModel, { nullable: true })
    teamB?: TeamModel;

    teamBId?: number;
}
