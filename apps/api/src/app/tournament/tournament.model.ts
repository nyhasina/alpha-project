import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { FormatModel } from '../format/format.model';
import { RuleModel } from '../rule/rule.model';
import { TeamModel } from '../team/team.model';
import { TournamentTypeModel } from '../tournament-type/tournament-type.model';

@ObjectType()
export class TournamentModel {
    @Field((returns) => Int)
    id: number;

    @Field()
    name: string;

    @Field((returns) => GraphQLISODateTime)
    date: Date;

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
}
