import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TournamentRewardModel } from '../tournament-reward/tournament-reward.model';

@ObjectType()
export class TournamentTypeModel {
    @Field((returns) => Int)
    id: number;

    @Field()
    name: string;

    @Field((returns) => TournamentRewardModel, { nullable: true })
    reward?: TournamentRewardModel;
}
