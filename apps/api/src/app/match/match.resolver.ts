import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GameCountModel } from '../game/game.model';
import { RoundService } from '../round/round.service';
import { CountArgs, Pagination } from '../shared/models/criteria.model';
import { TeamService } from '../team/team.service';
import { TournamentRewardModel } from '../tournament-reward/tournament-reward.model';
import { MATCH_FILTERING } from './match.filters';
import { MatchModel } from './match.model';
import { MatchService } from './match.service';

@ArgsType()
export class CreateMatchInput {
    @Field((returns) => Int)
    teamA: number;

    @Field((returns) => Int)
    teamB: number;

    @Field((returns) => Int)
    round: number;
}

@Resolver((of) => MatchModel)
export class MatchResolver {
    constructor(private matchService: MatchService, private teamService: TeamService, private roundService: RoundService) {}

    @ResolveField((returns) => TournamentRewardModel)
    async teamA(@Parent() match: MatchModel) {
        const { teamAId } = match;
        return this.teamService.loadTeam({ id: teamAId });
    }

    @ResolveField((returns) => TournamentRewardModel)
    async teamB(@Parent() match: MatchModel) {
        const { teamBId } = match;
        return this.teamService.loadTeam({ id: teamBId });
    }

    @ResolveField((returns) => TournamentRewardModel)
    async round(@Parent() match: MatchModel) {
        const { roundId } = match;
        return this.roundService.loadRound({ id: roundId });
    }

    @Query((returns) => GameCountModel)
    async matchCount(@Args() countArgs: CountArgs) {
        const { search } = countArgs;
        const total = await this.matchService.count({
            OR: [...MATCH_FILTERING(search)],
        });
        const count = new GameCountModel(total);
        return count;
    }

    @Query((returns) => MatchModel)
    async match(@Args('id', { type: () => Int }) id: number) {
        return this.matchService.loadMatch({
            id,
        });
    }

    @Query((returns) => [MatchModel])
    async matchs(@Args() pagination: Pagination) {
        const { take, skip, by, direction, search } = pagination;
        let orderBy = {};
        if (by && direction) {
            orderBy = { [by]: direction };
        }
        return this.matchService.loadMatchs({
            skip: (skip - 1) * take,
            take,
            where: {
                OR: MATCH_FILTERING(search),
            },
            orderBy,
        });
    }

    @Mutation((returns) => MatchModel)
    async createMatch(@Args() input: CreateMatchInput) {
        const { teamA, teamB, round } = input;
        return this.matchService.createMatch({
            teamA: {
                connect: {
                    id: teamA,
                },
            },
            teamB: {
                connect: {
                    id: teamB,
                },
            },
            round: {
                connect: {
                    id: round,
                },
            },
        });
    }

    @Mutation((returns) => MatchModel)
    async updateMatch(@Args('id', { type: () => Int }) id: number, @Args() input: CreateMatchInput) {
        const { teamA, teamB, round } = input;
        return this.matchService.updateMatch({
            where: {
                id,
            },
            data: {
                teamA: {
                    connect: {
                        id: teamA,
                    },
                },
                teamB: {
                    connect: {
                        id: teamB,
                    },
                },
                round: {
                    connect: {
                        id: round,
                    },
                },
            },
        });
    }

    @Mutation((returns) => MatchModel)
    async deleteMatch(@Args('id', { type: () => Int }) id: number) {
        return this.matchService.deleteMatch({ id });
    }
}
