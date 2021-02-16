import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PlatformModel } from '../platform/platform.model';

@ObjectType()
export class GameModel {
    @Field((type) => Int)
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    coverImage: string;

    @Field((type) => [PlatformModel], { nullable: true })
    platforms: PlatformModel[];
}

@ObjectType()
export class GameCountModel {
    @Field((type) => Int)
    total: number;

    constructor(total: number) {
        this.total = total;
    }
}
