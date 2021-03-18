import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { FormatModel } from '../format/format.model';
import { CreateMatchInput, MatchModel } from '../match/match.model';
import { RoundModel } from '../round/round.model';
import { RuleModel } from '../rule/rule.model';
import { TeamModel } from '../team/team.model';
import { TournamentTypeModel } from '../tournament-type/tournament-type.model';

@ObjectType()
export class TournamentModel {
    @Field((returns) => Int)
    id: number;

    @Field()
    name: string;

    @Field((returns) => GraphQLISODateTime, { nullable: true })
    date?: Date;

    @Field({ nullable: true })
    closed?: boolean;

    @Field((returns) => TournamentTypeModel)
    tournamentType: TournamentTypeModel;

    tournamentTypeId?: number;

    @Field((returns) => [RuleModel], { nullable: true })
    rules: RuleModel[];

    @Field((returns) => FormatModel)
    format: FormatModel;

    formatId?: number;

    @Field((returns) => [TeamModel], { nullable: true })
    teams: TeamModel[];

    @Field((returns) => [RoundModel], { nullable: true })
    rounds: RoundModel[];
}

export class MatchNode {
    data: Partial<MatchModel>;
    left: MatchNode;
    right: MatchNode;

    constructor(data: Partial<MatchModel>) {
        this.data = data;
    }

    toString(): string {
        return this.data.uuid;
    }
}
