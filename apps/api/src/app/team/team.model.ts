import { Field, Int, ObjectType } from '@nestjs/graphql';
import { emptyArrayMiddleware } from '../shared/middlewares/empty-array.middleware';
import { emptyObjectMiddleware } from '../shared/middlewares/empty-object.middleware';
import { TagModel } from '../tag/tag.model';
import { UserModel } from '../user/user.model';

@ObjectType()
export class TeamModel {
    @Field((type) => Int)
    id: number;

    @Field()
    name: string;

    @Field((type) => TagModel, { nullable: true })
    tag?: TagModel;

    @Field((type) => UserModel, { middleware: [emptyObjectMiddleware] })
    owner?: UserModel;

    ownerId?: number;

    tagId?: number;

    @Field((type) => [UserModel], { middleware: [emptyArrayMiddleware] })
    members?: UserModel[];
}
