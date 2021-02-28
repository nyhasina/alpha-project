import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TournamentRewardModel {
    @Field((returns) => Int)
    id: number;

    @Field()
    name: string;
}
