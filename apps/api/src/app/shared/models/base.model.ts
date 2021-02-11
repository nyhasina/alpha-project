import { Field, Int } from '@nestjs/graphql';

export class BaseModel {
    @Field((type) => Int)
    id: number;
}
