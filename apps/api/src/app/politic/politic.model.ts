import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PoliticModel {
    @Field((type) => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    content: string;

    @Field({ nullable: true })
    deleted?: boolean;
}
