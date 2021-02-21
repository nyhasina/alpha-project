import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LanguageModel {
    @Field((type) => Int)
    id: number;

    @Field()
    code: string;

    @Field()
    label: string;
}
