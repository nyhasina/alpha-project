import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GameCountModel } from '../game/game.model';
import { CountArgs, Pagination } from '../shared/models/criteria.model';
import { TOURNAMENT_TYPE_FILTERING } from './tournament-type.filters';
import { TournamentTypeModel } from './tournament-type.model';
import { TournamentTypeService } from './tournament-type.service';

@ArgsType()
export class CreateTournamentTypeInput {
    @Field()
    name: string;
}

@Resolver((of) => TournamentTypeModel)
export class TournamentTypeResolver {
    constructor(private tournamentTypeService: TournamentTypeService) {}

    @Query((returns) => GameCountModel)
    async tournamentTypeCount(@Args() countArgs: CountArgs) {
        const { search } = countArgs;
        const total = await this.tournamentTypeService.count({
            OR: [...TOURNAMENT_TYPE_FILTERING(search)],
        });
        const count = new GameCountModel(total);
        return count;
    }

    @Query((returns) => TournamentTypeModel)
    async tournamentType(@Args('id', { type: () => Int }) id: number) {
        return this.tournamentTypeService.loadTournamentType({
            id,
        });
    }

    @Query((returns) => [TournamentTypeModel])
    async tournamentTypes(@Args() pagination: Pagination) {
        const { take, skip, by, direction, search } = pagination;
        let orderBy = {};
        if (by && direction) {
            orderBy = { [by]: direction };
        }
        return this.tournamentTypeService.loadTournamentTypes({
            skip: (skip - 1) * take,
            take,
            where: {
                OR: TOURNAMENT_TYPE_FILTERING(search),
            },
            orderBy,
        });
    }

    @Mutation((returns) => TournamentTypeModel)
    async createTournamentType(@Args() input: CreateTournamentTypeInput) {
        const { name } = input;
        return this.tournamentTypeService.createTournamentType({
            name,
        });
    }

    @Mutation((returns) => TournamentTypeModel)
    async updateTournamentType(@Args('id', { type: () => Int }) id: number, @Args() input: CreateTournamentTypeInput) {
        const { name } = input;
        return this.tournamentTypeService.updateTournamentType({
            where: {
                id,
            },
            data: {
                name,
            },
        });
    }

    @Mutation((returns) => TournamentTypeModel)
    async deleteTournamentType(@Args('id', { type: () => Int }) id: number) {
        return this.tournamentTypeService.deleteTournamentType({ id });
    }
}
