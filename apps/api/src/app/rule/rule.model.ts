import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatementModel {
    @Field((returns) => Int)
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    content?: string;

    ruleId?: number
}
