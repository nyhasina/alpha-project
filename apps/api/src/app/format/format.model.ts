import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FormatModel {
    @Field((returns) => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    code: string;
}
