import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class Pagination<T> {
    @Field((type) => Int, { nullable: true })
    take?: number;

    @Field((type) => Int, { nullable: true })
    skip?: number;

    @Field({ nullable: true })
    by?: string;

    @Field({ nullable: true })
    direction?: string;

    @Field({ nullable: true })
    search?: string;
}
