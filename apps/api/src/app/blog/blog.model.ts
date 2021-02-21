import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BlogModel {
    @Field((type) => Int)
    id: number;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    content?: string;

    @Field({ nullable: true })
    cover?: string;
    
    @Field({ nullable: true })
    video?: string;

    @Field({ nullable: true })
    isRemoved?: boolean;
}
