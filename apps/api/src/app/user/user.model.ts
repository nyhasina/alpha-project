import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProfileModel } from '../profile/profile.model';
import { passwordMiddleware } from '../shared/middlewares/password.middleware';
import { TeamModel } from '../team/team.model';

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

    @Field((type) => [TeamModel], { nullable: true })
    joinedTeams?: TeamModel[];
}
