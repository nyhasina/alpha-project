import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContactModel {
    @Field((type) => Int)
    id: number;

    @Field({ nullable: true })
    forename?: string;

    @Field({ nullable: true })
    surname?: string;
}
