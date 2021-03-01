import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GameCountModel } from '../game/game.model';
import { CountArgs, Pagination } from '../shared/models/criteria.model';
import { FORMAT_FILTERING } from './format.filters';
import { FormatModel } from './format.model';
import { FormatService } from './format.service';

@ArgsType()
export class CreateFormatInput {
    @Field()
    name: string;
}

@Resolver((of) => FormatModel)
export class FormatResolver {
    constructor(private formatService: FormatService) {}

    @Query((returns) => GameCountModel)
    async formatCount(@Args() countArgs: CountArgs) {
        const { search } = countArgs;
        const total = await this.formatService.count({
            OR: [...FORMAT_FILTERING(search)],
        });
        const count = new GameCountModel(total);
        return count;
    }

    @Query((returns) => FormatModel)
    async format(@Args('id', { type: () => Int }) id: number) {
        return this.formatService.loadFormat({
            id,
        });
    }

    @Query((returns) => [FormatModel])
    async formats(@Args() pagination: Pagination) {
        const { take, skip, by, direction, search } = pagination;
        let orderBy = {};
        if (by && direction) {
            orderBy = { [by]: direction };
        }
        return this.formatService.loadFormats({
            skip: (skip - 1) * take,
            take,
            where: {
                OR: FORMAT_FILTERING(search),
            },
            orderBy,
        });
    }

    @Mutation((returns) => FormatModel)
    async createFormat(@Args() input: CreateFormatInput) {
        const { name } = input;
        return this.formatService.createFormat({
            name,
        });
    }

    @Mutation((returns) => FormatModel)
    async updateFormat(@Args('id', { type: () => Int }) id: number, @Args() input: CreateFormatInput) {
        const { name } = input;
        return this.formatService.updateFormat({
            where: {
                id,
            },
            data: {
                name,
            },
        });
    }

    @Mutation((returns) => FormatModel)
    async deleteFormat(@Args('id', { type: () => Int }) id: number) {
        return this.formatService.deleteFormat({ id });
    }
}
