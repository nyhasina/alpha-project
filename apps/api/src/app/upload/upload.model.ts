import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadModel {
    @Field((type) => Int)
    id: number;

    @Field({ nullable: true })
    filename?: string;
}
