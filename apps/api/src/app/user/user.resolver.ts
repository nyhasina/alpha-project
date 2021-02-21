import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GameCountModel } from '../game/game.model';
import { PROFILE_FILTERING } from '../profile/profile.constants';
import { ProfileModel } from '../profile/profile.model';
import { ProfileService } from '../profile/profile.service';
import { CountArgs, Pagination } from '../shared/models/criteria.model';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@ArgsType()
export class CreateUserInput {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field({ nullable: true })
    firstname?: string;

    @Field({ nullable: true })
    lastname?: string;

    @Field({ nullable: true })
    username?: string;

    @Field((type) => Int, { nullable: true })
    currency?: number;

    @Field((type) => Int, { nullable: true })
    language?: number;
}

@Resolver((of) => UserModel)
export class UserResolver {
    constructor(private userService: UserService, private profileService: ProfileService) {}

    @ResolveField((type) => ProfileModel)
    async profile(@Parent() user: UserModel) {
        const { id } = user;
        return this.profileService.loadProfile({
            userId: id,
        });
    }

    @Query((returns) => GameCountModel)
    async userCount(@Args() countArgs: CountArgs) {
        const { search } = countArgs;
        const total = await this.userService.count({
            OR: [
                {
                    email: {
                        contains: search,
                    },
                },
                {
                    profile: {
                        OR: PROFILE_FILTERING(search),
                    },
                },
            ],
        });
        const count = new GameCountModel(total);
        return count;
    }

    @Query((returns) => UserModel)
    async user(@Args('id', { type: () => Int }) id: number) {
        return this.userService.loadUser({
            id,
        });
    }

    @Query((returns) => [UserModel])
    async users(@Args() pagination: Pagination) {
        const { take, skip, by, direction, search } = pagination;
        let orderBy = {};
        if (by && direction) {
            orderBy = { [by]: direction };
        }
        return this.userService.loadUsers({
            skip,
            take,
            where: {
                OR: [
                    {
                        email: {
                            contains: search,
                        },
                    },
                    {
                        profile: {
                            OR: PROFILE_FILTERING(search),
                        },
                    },
                ],
            },
            orderBy,
        });
    }

    @Mutation((returns) => UserModel)
    async createUser(@Args() input: CreateUserInput) {
        const { email, password, firstname, lastname, currency, language, username } = input;
        return this.userService.createUser({
            email,
            password,
            profile: {
                create: {
                    username,
                    firstname,
                    lastname,
                    language: {
                        connect: {
                            id: language,
                        },
                    },
                    currency: {
                        connect: {
                            id: currency,
                        },
                    },
                },
            },
        });
    }

    @Mutation((returns) => UserModel)
    async updateUser(@Args('id', { type: () => Int }) id: number, @Args() input: CreateUserInput) {
        const { email, password } = input;
        return this.userService.updateUser({
            where: {
                id,
            },
            data: {
                email,
            },
        });
    }

    @Mutation((returns) => UserModel)
    async deleteUser(@Args('id', { type: () => Int }) id: number) {
        return this.userService.deleteUser({ id });
    }
}
