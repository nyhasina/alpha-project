import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProfileModel } from '../profile/profile.model';
import { passwordMiddleware } from '../shared/middlewares/password.middleware';

@ObjectType()
export class UserModel {
    @Field((type) => Int)
    id: number;

    @Field()
    email: string;

    @Field({ nullable: true, middleware: [passwordMiddleware] })
    password?: string;

    @Field((type) => ProfileModel, { nullable: true })
    profile?: ProfileModel;
}
