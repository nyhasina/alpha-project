import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PlatformModel } from '../platform/platform.model';
import { PlatformService } from './platform.service';

@ArgsType()
export class CreatePlatformInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    logo?: string;

    @Field({ nullable: true })
    deleted?: boolean;
}

@Resolver((of) => PlatformModel)
export class PlatformResolver {
    constructor(private platformService: PlatformService) {}

    @Query((returns) => PlatformModel)
    async platform(@Args('id', { type: () => Int, name: 'platform' }) id: number) {
        return this.platformService.loadPlatform({ id });
    }

    @Query((returns) => [PlatformModel])
    async platforms() {
        return this.platformService.loadPlatforms({});
    }

    @Mutation((returns) => PlatformModel)
    async createPlatform(@Args() input: CreatePlatformInput) {
        const { name, logo } = input;
        return this.platformService.createPlatform({ name, logo });
    }

    @Mutation((returns) => PlatformModel)
    async updatePlatform(@Args('id', { type: () => Int }) id: number, @Args() input: CreatePlatformInput) {
        const { name, logo } = input;
        return this.platformService.updatePlatform({
            where: {
                id,
            },
            data: {
                name,
                logo,
            },
        });
    }

    @Mutation((returns) => PlatformModel)
    async deletePlatform(@Args('id', { type: () => Int }) id: number) {
        return this.platformService.deletePlatform({
            id,
        });
    }
}
