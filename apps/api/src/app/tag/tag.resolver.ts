import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GameCountModel } from '../game/game.model';
import { CountArgs, Pagination } from '../shared/models/criteria.model';
import { UserService } from '../user/user.service';
import { TAG_FILTERING } from './tag.filters';
import { TagModel } from './tag.model';
import { TagService } from './tag.service';

@ArgsType()
export class CreateTagInput {
    @Field()
    name: string;
}

@Resolver((of) => TagModel)
export class TagResolver {
    constructor(private tagService: TagService, private userService: UserService) {}

    @Query((returns) => GameCountModel)
    async tagCount(@Args() countArgs: CountArgs) {
        const { search } = countArgs;
        const total = await this.tagService.count({});
        const count = new GameCountModel(total);
        return count;
    }

    @Query((returns) => TagModel)
    async tag(@Args('id', { type: () => Int }) id: number) {
        return this.tagService.loadTag({
            id,
        });
    }

    @Query((returns) => [TagModel])
    async tags(@Args() pagination: Pagination) {
        const { take, skip, by, direction, search } = pagination;
        let orderBy = {};
        if (by && direction) {
            orderBy = { [by]: direction };
        }
        return this.tagService.loadTags({
            skip,
            take,
            where: {
                OR: [...TAG_FILTERING(search)],
            },
            orderBy,
        });
    }

    @Mutation((returns) => TagModel)
    async createTag(@Args() input: CreateTagInput) {
        const { name } = input;
        return this.tagService.createTag({
            name,
            tag,
        });
    }

    @Mutation((returns) => TagModel)
    async updateTag(@Args('id', { type: () => Int }) id: number, @Args() input: CreateTagInput) {
        const { name } = input;
        return this.tagService.updateTag({
            where: {
                id,
            },
            data: {
                name,
            },
        });
    }

    @Mutation((returns) => TagModel)
    async deleteTag(@Args('id', { type: () => Int }) id: number) {
        return this.tagService.deleteTag({ id });
    }
}
