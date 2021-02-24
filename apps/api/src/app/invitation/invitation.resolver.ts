import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GameCountModel } from '../game/game.model';
import { CountArgs, Pagination } from '../shared/models/criteria.model';
import { TeamModel } from '../team/team.model';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';
import { INVITATION_FILTERING } from './invitation.filters';
import { InvitationModel } from './invitation.model';
import { InvitationService } from './invitation.service';

@ArgsType()
export class CreateInvitationInput {
    @Field((returns) => Int)
    sender: number;

    @Field((returns) => Int)
    receiver: number;

    @Field((returns) => Int)
    team: number;

    @Field({ nullable: true })
    date?: string;

    @Field({ nullable: true })
    status?: string;
}

@Resolver((of) => InvitationModel)
export class InvitationResolver {
    constructor(
        private invitationService: InvitationService,
        private teamService: TeamService,
        private userService: UserService
    ) {}

    @ResolveField((type) => TeamModel)
    async team(@Parent() invitation: InvitationModel) {
        const { teamId } = invitation;
        return this.teamService.loadTeam({
            id: teamId,
        });
    }

    @ResolveField((type) => TeamModel)
    async sender(@Parent() invitation: InvitationModel) {
        const { senderId } = invitation;
        return this.userService.loadUser({
            id: senderId,
        });
    }

    @ResolveField((type) => TeamModel)
    async receiver(@Parent() invitation: InvitationModel) {
        const { receiverId } = invitation;
        return this.userService.loadUser({
            id: receiverId,
        });
    }

    @Query((returns) => GameCountModel)
    async invitationCount(@Args() countArgs: CountArgs) {
        const { search } = countArgs;
        const total = await this.invitationService.count({
            OR: INVITATION_FILTERING(search),
        });
        const count = new GameCountModel(total);
        return count;
    }

    @Query((returns) => InvitationModel)
    async invitation(@Args('id', { type: () => Int }) id: number) {
        return this.invitationService.loadInvitation({
            id,
        });
    }

    @Query((returns) => [InvitationModel])
    async invitations(@Args() pagination: Pagination) {
        const { take, skip, by, direction, search } = pagination;
        let orderBy = {};
        if (by && direction) {
            orderBy = { [by]: direction };
        }
        return this.invitationService.loadInvitations({
            skip: (skip - 1) * take,
            take,
            where: {
                OR: INVITATION_FILTERING(search),
            },
            orderBy,
        });
    }

    @Mutation((returns) => InvitationModel)
    async createInvitation(@Args() input: CreateInvitationInput) {
        const { sender, receiver, team, date, status } = input;
        const duplicate = await this.invitationService.loadFirst({
            sender: { id: sender },
            receiver: { id: receiver },
            team: { id: team },
        });
        if (duplicate) {
            return duplicate;
        }
        return this.invitationService.createInvitation({
            sender: {
                connect: {
                    id: sender,
                },
            },
            receiver: {
                connect: {
                    id: receiver,
                },
            },
            team: {
                connect: {
                    id: team,
                },
            },
            date,
            status,
        });
    }

    @Mutation((returns) => InvitationModel)
    async updateInvitation(@Args('id', { type: () => Int }) id: number, @Args() input: CreateInvitationInput) {
        const { sender, receiver, date, status, team } = input;
        return this.invitationService.updateInvitation({
            where: {
                id,
            },
            data: {
                sender: {
                    connect: {
                        id: sender,
                    },
                },
                receiver: {
                    connect: {
                        id: receiver,
                    },
                },
                team: {
                    connect: {
                        id: team,
                    },
                },
                date,
                status,
            },
        });
    }

    @Mutation((returns) => InvitationModel)
    async deleteInvitation(@Args('id', { type: () => Int }) id: number) {
        return this.invitationService.deleteInvitation({ id });
    }
}
