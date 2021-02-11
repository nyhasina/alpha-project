import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@ArgsType()
export class CreateUserInput {
    @Field()
    email: string;

    @Field()
    password: string;
}

@Resolver((of) => UserModel)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query((returns) => UserModel)
    async user(@Args('id', { type: () => Int }) id: number) {
        return this.userService.loadUser({ id });
    }

    @Query((returns) => [UserModel])
    async users() {
        return this.userService.loadUsers({});
    }

    @Mutation((returns) => UserModel)
    async createUser(@Args() input: CreateUserInput) {
        const { email, password } = input;
        return this.userService.createUser({ email, password });
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
