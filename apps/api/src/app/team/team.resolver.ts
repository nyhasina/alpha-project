import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GameCountModel, GameModel } from '../game/game.model';
import { CountArgs, Pagination } from '../shared/models/criteria.model';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';
import { TEAM_FILTERING } from './team.filters';
import { TeamModel } from './team.model';
import { TeamService } from './team.service';

@ArgsType()
export class CreateTeamInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    tag?: string;

    @Field((type) => [Int], { nullable: true })
    members?: number[];

    @Field((type) => Int, { nullable: true })
    owner?: number;
}

@Resolver((of) => TeamModel)
export class TeamResolver {
    constructor(private teamService: TeamService, private userService: UserService, private tagService: TagService) {}

    @ResolveField()
    async tag(@Parent() team: TeamModel) {
        const { tagId } = team;
        if (!tagId) {
          return;
        }
        return this.tagService.loadTag({ id: tagId });
    }

    @ResolveField()
    async owner(@Parent() team: TeamModel) {
        const { ownerId } = team;
      if (!ownerId) {
        return;
      }
      return this.userService.loadUser({ id: ownerId });
    }

    @ResolveField()
    async members(@Parent() team: TeamModel) {
        const { members } = team;
        return this.userService.loadUsers({
            where: {
                id: {
                    in: members.map((item) => item.id),
                },
            },
        });
    }

    @Query((returns) => GameCountModel)
    async teamCount(@Args() countArgs: CountArgs) {
        const { search } = countArgs;
        const total = await this.teamService.count({});
        const count = new GameCountModel(total);
        return count;
    }

    @Query((returns) => TeamModel)
    async team(@Args('id', { type: () => Int }) id: number) {
        return this.teamService.loadTeam({
            id,
        });
    }

    @Query((returns) => [TeamModel])
    async teams(@Args() pagination: Pagination) {
        const { take, skip, by, direction, search } = pagination;
        let orderBy = {};
        if (by && direction) {
            orderBy = { [by]: direction };
        }
        return this.teamService.loadTeams({
            skip,
            take,
            where: {
                OR: [...TEAM_FILTERING(search)],
            },
            orderBy,
        });
    }

    @Mutation((returns) => TeamModel)
    async createTeam(@Args() input: CreateTeamInput) {
        const { name, tag, owner, members } = input;
        return this.teamService.createTeam({
            name,
            tag: {
                connectOrCreate: {
                    where: {
                        name: tag.toLowerCase(),
                    },
                    create: {
                        name: tag.toLowerCase(),
                    },
                },
            },
            owner: {
                connect: {
                    id: owner,
                },
            },
            members: {
                connect: [
                    {
                        id: owner,
                    },
                    ...(members || []).map((item) => ({ id: item })),
                ],
            },
        });
    }

    @Mutation((returns) => TeamModel)
    async updateTeam(@Args('id', { type: () => Int }) id: number, @Args() input: CreateTeamInput) {
        const { name, tag, owner, members } = input;
        return this.teamService.updateTeam({
            where: {
                id,
            },
            data: {
                name,
                tag: {
                    connectOrCreate: {
                        where: {
                            name: tag.toLowerCase(),
                        },
                        create: {
                            name: tag.toLowerCase(),
                        },
                    },
                },
                owner: {
                    update: {
                        id: owner,
                    },
                },
                members: {
                    set: [],
                    connect: members.map((item) => ({ id: item })),
                },
            },
        });
    }

    @Mutation((returns) => TeamModel)
    async deleteTeam(@Args('id', { type: () => Int }) id: number) {
        return this.teamService.deleteTeam({ id });
    }
}
