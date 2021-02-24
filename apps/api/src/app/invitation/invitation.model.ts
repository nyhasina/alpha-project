import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TeamModel } from '../team/team.model';
import { UserModel } from '../user/user.model';

@ObjectType()
export class InvitationModel {
    @Field((type) => Int)
    id: number;

    @Field((type) => UserModel)
    sender: UserModel;

    senderId?: number;

    @Field((type) => UserModel)
    receiver: UserModel;

    receiverId?: number;

    @Field((type) => TeamModel)
    team: TeamModel;

    teamId?: number;

    @Field((type) => String, { nullable: true })
    date?: string;

    @Field((type) => String, { nullable: true })
    status?: string;
}
