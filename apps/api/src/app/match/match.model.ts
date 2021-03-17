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
    @Field({ nullable: true })
    uuid?: string;

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

    @Field((returns) => MatchModel, { nullable: true })
    next?: MatchModel;

    nextId?: string;

    constructor(uuid: string = null) {
        this.roundId = null;
        this.teamAId = null;
        this.teamBId = null;
        this.nextId = null;
        this.uuid = uuid;
        this.next = null;
    }

    public toString(): string {
      return this.uuid;
    }

    setUuid(v: string) {
      console.log(v);
        this.uuid = v;
    }

    setNext(v: string) {
        this.nextId = v;
    }

    getUuid(): string {
      return this.uuid;
    }
}
