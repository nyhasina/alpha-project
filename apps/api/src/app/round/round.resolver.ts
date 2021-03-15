import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GameCountModel } from '../game/game.model';
import { MatchService } from '../match/match.service';
import { RoundService } from '../round/round.service';
import { CountArgs, Pagination } from '../shared/models/criteria.model';
import { TournamentRewardModel } from '../tournament-reward/tournament-reward.model';
import { TournamentService } from '../tournament/tournament.service';
import { ROUND_FILTERING } from './round.filters';
import { RoundModel } from './round.model';

@ArgsType()
export class CreateRoundInput {
    @Field((returns) => Int)
    rank: number;

    @Field((returns) => Int)
    tournament: number;

    @Field((returns) => [Int])
    matchs?: number[];
}

@Resolver((of) => RoundModel)
export class RoundResolver {
    constructor(
        private tournamentService: TournamentService,
        private roundService: RoundService,
        private matchService: MatchService
    ) {}

    @ResolveField((returns) => TournamentRewardModel)
    async tournament(@Parent() round: RoundModel) {
        const { tournamentId } = round;
        return this.tournamentService.loadTournament({ id: tournamentId });
    }

    @ResolveField((returns) => TournamentRewardModel)
    async matchs(@Parent() round: RoundModel) {
        const { id } = round;
        return this.matchService.loadMatchs({
            where: {
                round: {
                    id,
                },
            },
        });
    }

    @Query((returns) => GameCountModel)
    async roundCount(@Args() countArgs: CountArgs) {
        const { search } = countArgs;
        const total = await this.roundService.count({
            OR: [...ROUND_FILTERING(search)],
        });
        const count = new GameCountModel(total);
        return count;
    }

    @Query((returns) => RoundModel)
    async round(@Args('id', { type: () => Int }) id: number) {
        return this.roundService.loadRound({
            id,
        });
    }

    @Query((returns) => [RoundModel])
    async rounds(@Args() pagination: Pagination) {
        const { take, skip, by, direction, search } = pagination;
        let orderBy = {};
        if (by && direction) {
            orderBy = { [by]: direction };
        }
        return this.roundService.loadRounds({
            skip: (skip - 1) * take,
            take,
            where: {
                OR: ROUND_FILTERING(search),
            },
            orderBy,
        });
    }

    @Mutation((returns) => RoundModel)
    async createRound(@Args() input: CreateRoundInput) {
        const { rank, tournament, matchs } = input;
        return this.roundService.createRound({
            rank,
            tournament: {
                connect: {
                    id: tournament,
                },
            },
            matchs: {
                connect: matchs.map((id) => ({ id })),
            },
        });
    }

    @Mutation((returns) => RoundModel)
    async updateRound(@Args('id', { type: () => Int }) id: number, @Args() input: CreateRoundInput) {
        const { rank, tournament, matchs } = input;
        return this.roundService.updateRound({
            where: {
                id,
            },
            data: {
                rank,
                tournament: {
                    connect: {
                        id: tournament,
                    },
                },
                matchs: {
                    connect: matchs.map((id) => ({ id })),
                },
            },
        });
    }

    @Mutation((returns) => RoundModel)
    async deleteRound(@Args('id', { type: () => Int }) id: number) {
        return this.roundService.deleteRound({ id });
    }
}
