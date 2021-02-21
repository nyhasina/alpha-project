import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProfileModel } from '../profile/profile.model';

@ObjectType()
export class UserModel {
    @Field((type) => Int)
    id: number;

    @Field()
    email: string;

    @Field({ nullable: true })
    password?: string;

    @Field((type) => ProfileModel, { nullable: true })
    profile?: ProfileModel;
}
