import { Field, Int, ObjectType } from '@nestjs/graphql';
import { emptyArrayMiddleware } from '../shared/middlewares/empty-array.middleware';
import { emptyObjectMiddleware } from '../shared/middlewares/empty-object.middleware';
import { UserModel } from '../user/user.model';

@ObjectType()
export class TeamModel {
    @Field((type) => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    tag?: string;

    @Field((type) => UserModel, { middleware: [emptyObjectMiddleware] })
    owner?: UserModel;

    ownerId?: number;

    @Field((type) => [UserModel], { middleware: [emptyArrayMiddleware] })
    members?: UserModel[];
}
