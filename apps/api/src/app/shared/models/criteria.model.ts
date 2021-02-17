import { ArgsType, Field, Int, OmitType } from '@nestjs/graphql';

@ArgsType()
export class Pagination {
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

@ArgsType()
export class CountArgs extends OmitType(Pagination, ['take', 'skip', 'by', 'direction']) {}
