import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PlatformModel {
    @Field((type) => Int)
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    logo?: string;

    @Field({ nullable: true })
    deleted?: boolean;
}
