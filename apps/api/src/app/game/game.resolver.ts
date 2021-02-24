import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GameCountModel, GameModel } from '../game/game.model';
import { GameService } from '../game/game.service';
import { PlatformService } from '../platform/platform.service';
import { CountArgs, Pagination } from '../shared/models/criteria.model';

@ArgsType()
export class CreateGameInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    coverImage?: string;

    @Field((type) => [Int], { nullable: true })
    platforms: number[];
}

@Resolver(() => GameModel)
export class GameResolver {
    constructor(private gameService: GameService, private platformService: PlatformService) {}

    @ResolveField()
    async platforms(@Parent() game: GameModel) {
        const { platforms } = game;
        return this.platformService.loadPlatforms({
            where: {
                id: {
                    in: platforms.map((item) => item.id),
                },
            },
        });
    }

    @Query((returns) => GameModel)
    async game(@Args('id', { type: () => Int, name: 'game' }) id: number) {
        return this.gameService.loadGame({ id });
    }

    @Query((returns) => [GameModel])
    async games(@Args() pagination: Pagination) {
        const { take, skip, by, direction, search } = pagination;
        let orderBy = {};
        if (by && direction) {
            orderBy = { [by]: direction };
        }
        return this.gameService.loadGames({
            skip: (skip - 1) * take,
            take,
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        platforms: {
                            some: {
                                name: {
                                    contains: search,
                                },
                            },
                        },
                    },
                ],
            },
            orderBy,
        });
    }

    @Query((returns) => GameCountModel)
    async gameCount(@Args() countArgs: CountArgs) {
        const { search } = countArgs;
        const total = await this.gameService.count({
            OR: [
                {
                    name: {
                        contains: search,
                    },
                },
                {
                    platforms: {
                        some: {
                            name: {
                                contains: search,
                            },
                        },
                    },
                },
            ],
        });
        const count = new GameCountModel(total);
        return count;
    }

    @Mutation((returns) => GameModel)
    async createGame(@Args() input: CreateGameInput) {
        const { name, coverImage } = input;
        const platforms = Array.from(input.platforms, (id) => ({ id }));

        return this.gameService.createGame({
            name,
            coverImage,
            platforms: {
                connect: platforms,
            },
        });
    }

    @Mutation((returns) => GameModel)
    async updateGame(@Args('id', { type: () => Int }) id: number, @Args() input: CreateGameInput) {
        const { name, coverImage } = input;
        const platforms = Array.from(input.platforms, (id) => ({ id }));
        return this.gameService.updateGame({
            where: {
                id,
            },
            data: {
                name,
                coverImage,
                platforms: {
                    set: [],
                    connect: platforms,
                },
            },
        });
    }

    @Mutation((returns) => GameModel)
    async deleteGame(@Args('id', { type: () => Int }) id: number) {
        return this.gameService.deleteGame({
            id,
        });
    }
}
