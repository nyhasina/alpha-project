import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GameCountModel } from '../game/game.model';
import { CountArgs, Pagination } from '../shared/models/criteria.model';
import { TOURNAMENT_REWARD_FILTERING } from './tournament-reward.filters';
import { TournamentRewardModel } from './tournament-reward.model';
import { TournamentRewardService } from './tournament-reward.service';

@ArgsType()
export class CreateTournamentRewardInput {
    @Field()
    name: string;
}

@Resolver((of) => TournamentRewardModel)
export class TournamentRewardResolver {
    constructor(private tournamentRewardService: TournamentRewardService) {}

    @Query((returns) => GameCountModel)
    async tournamentRewardCount(@Args() countArgs: CountArgs) {
        const { search } = countArgs;
        const total = await this.tournamentRewardService.count({
            OR: [...TOURNAMENT_REWARD_FILTERING(search)],
        });
        const count = new GameCountModel(total);
        return count;
    }

    @Query((returns) => TournamentRewardModel)
    async tournamentReward(@Args('id', { type: () => Int }) id: number) {
        return this.tournamentRewardService.loadTournamentReward({
            id,
        });
    }

    @Query((returns) => [TournamentRewardModel])
    async tournamentRewards(@Args() pagination: Pagination) {
        const { take, skip, by, direction, search } = pagination;
        let orderBy = {};
        if (by && direction) {
            orderBy = { [by]: direction };
        }
        return this.tournamentRewardService.loadTournamentRewards({
            skip: (skip - 1) * take,
            take,
            where: {
                OR: TOURNAMENT_REWARD_FILTERING(search),
            },
            orderBy,
        });
    }

    @Mutation((returns) => TournamentRewardModel)
    async createTournamentReward(@Args() input: CreateTournamentRewardInput) {
        const { name } = input;
        return this.tournamentRewardService.createTournamentReward({
            name,
        });
    }

    @Mutation((returns) => TournamentRewardModel)
    async updateTournamentReward(@Args('id', { type: () => Int }) id: number, @Args() input: CreateTournamentRewardInput) {
        const { name } = input;
        return this.tournamentRewardService.updateTournamentReward({
            where: {
                id,
            },
            data: {
                name,
            },
        });
    }

    @Mutation((returns) => TournamentRewardModel)
    async deleteTournamentReward(@Args('id', { type: () => Int }) id: number) {
        return this.tournamentRewardService.deleteTournamentReward({ id });
    }
}
