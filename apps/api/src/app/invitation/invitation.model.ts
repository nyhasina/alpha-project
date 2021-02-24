import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../user/user.model';

@ObjectType()
export class InvitationModel {
    @Field((type) => Int)
    id: number;

    @Field((type) => UserModel)
    sender: UserModel;

    @Field((type) => UserModel)
    receiver: UserModel;

    @Field((type) => String, { nullable: true })
    date?: string;

    @Field((type) => String, { nullable: true })
    status?: string;
}
