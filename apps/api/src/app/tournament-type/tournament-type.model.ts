import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TournamentTypeModel {
    @Field((returns) => Int)
    id: number;

    @Field()
    name: string;
}
