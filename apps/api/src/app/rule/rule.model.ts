import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RuleModel {
    @Field((returns) => Int)
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    content?: string;
}
