import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FormatService } from '../format/format.service';
import { GameCountModel } from '../game/game.model';
import { RoundService } from '../round/round.service';
import { RuleService } from '../rule/rule.service';
import { CountArgs, Pagination } from '../shared/models/criteria.model';
import { TeamModel } from '../team/team.model';
import { TeamService } from '../team/team.service';
import { TournamentRewardModel } from '../tournament-reward/tournament-reward.model';
import { TournamentTypeService } from '../tournament-type/tournament-type.service';
import { TOURNAMENT_FILTERING } from './tournament.filters';
import { TournamentModel } from './tournament.model';
import { TournamentService } from './tournament.service';

@ArgsType()
export class CreateTournamentInput {
    @Field()
    name: string;

    @Field()
    date?: string;

    @Field((returns) => Int)
    tournamentType: number;

    @Field((returns) => [Int], { nullable: true })
    rules: number[];

    @Field((returns) => Int)
    format: number;

    @Field((returns) => [Int], { nullable: true })
    teams: number[];

    @Field((returns) => [Int], { nullable: true })
    rounds: number[];
}

@Resolver((of) => TournamentModel)
export class TournamentResolver {
    constructor(
        private tournamentService: TournamentService,
        private tournamentTypeService: TournamentTypeService,
        private ruleService: RuleService,
        private formatService: FormatService,
        private teamService: TeamService,
        private roundService: RoundService
    ) {}

    @ResolveField((returns) => TournamentRewardModel)
    async tournamentType(@Parent() tournament: TournamentModel) {
        const { tournamentTypeId } = tournament;
        return this.tournamentTypeService.loadTournamentType({ id: tournamentTypeId });
    }

    @ResolveField((returns) => TournamentRewardModel)
    async format(@Parent() tournament: TournamentModel) {
        const { formatId } = tournament;
        return this.formatService.loadFormat({ id: formatId });
    }

    @ResolveField((returns) => [TeamModel])
    async teams(@Parent() tournament: TournamentModel) {
        const { id } = tournament;
        return this.teamService.loadTeams({
            where: {
                tournaments: {
                    some: {},
                },
            },
        });
    }

    @ResolveField((returns) => [TeamModel])
    async rounds(@Parent() tournament: TournamentModel) {
        const { id } = tournament;
        return this.roundService.loadRounds({
            where: {
                tournament: {
                    id,
                },
            },
        });
    }

    @Query((returns) => GameCountModel)
    async tournamentCount(@Args() countArgs: CountArgs) {
        const { search } = countArgs;
        const total = await this.tournamentService.count({
            OR: [...TOURNAMENT_FILTERING(search)],
        });
        const count = new GameCountModel(total);
        return count;
    }

    @Query((returns) => TournamentModel)
    async tournament(@Args('id', { type: () => Int }) id: number) {
        return this.tournamentService.loadTournament({
            id,
        });
    }

    @Query((returns) => [TournamentModel])
    async tournaments(@Args() pagination: Pagination) {
        const { take, skip, by, direction, search } = pagination;
        let orderBy = {};
        if (by && direction) {
            orderBy = { [by]: direction };
        }
        return this.tournamentService.loadTournaments({
            skip: (skip - 1) * take,
            take,
            where: {
                OR: TOURNAMENT_FILTERING(search),
            },
            orderBy,
        });
    }

    @Mutation((returns) => TournamentModel)
    async createTournament(@Args() input: CreateTournamentInput) {
        const { name, date, tournamentType, rules, format, teams } = input;
        return this.tournamentService.createTournament({
            name,
            date,
            tournamentType: {
                connect: {
                    id: tournamentType,
                },
            },
            format: {
                connect: {
                    id: format,
                },
            },
            rules: {
                connect: (rules || []).map((id) => ({ id })),
            },
            teams: {
                connect: (teams || []).map((id) => ({ id })),
            },
        });
    }

    @Mutation((returns) => TournamentModel)
    async updateTournament(@Args('id', { type: () => Int }) id: number, @Args() input: CreateTournamentInput) {
        const { name, date, tournamentType, rules, format, teams } = input;
        return this.tournamentService.updateTournament({
            where: {
                id,
            },
            data: {
                name,
                date,
                tournamentType: {
                    connect: {
                        id: tournamentType,
                    },
                },
                format: {
                    connect: {
                        id: format,
                    },
                },
                rules: {
                    set: [],
                    connect: (rules || []).map((id) => ({ id })),
                },
                teams: {
                    set: [],
                    connect: (rules || []).map((id) => ({ id })),
                },
            },
        });
    }

    @Mutation((returns) => TournamentModel)
    async deleteTournament(@Args('id', { type: () => Int }) id: number) {
        return this.tournamentService.deleteTournament({ id });
    }
}
