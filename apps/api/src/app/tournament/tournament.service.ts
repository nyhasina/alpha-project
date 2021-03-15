import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Tournament } from '@prisma/client';
import { CreateMatchInput } from '../match/match.model';
import { MatchService } from '../match/match.service';
import { PrismaService } from '../prisma/prisma.service';
import { getRandomInt } from '../shared/helpers/get-random-int.helper';
import { TournamentModel } from './tournament.model';

@Injectable()
export class TournamentService {
    constructor(private prisma: PrismaService, private matchService: MatchService) {}

    async loadTournament(where: Prisma.TournamentWhereUniqueInput): Promise<Tournament | null> {
        return this.prisma.tournament.findUnique({
            where,
            include: {
                format: true,
                rules: true,
                teams: true,
                tournamentType: true,
            },
        });
    }

    async loadTournaments(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TournamentWhereUniqueInput;
        where?: Prisma.TournamentWhereInput;
        orderBy?: Prisma.TournamentOrderByInput;
    }): Promise<Tournament[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.tournament.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                format: true,
                rules: true,
                teams: true,
                tournamentType: true,
            },
        });
    }

    async count(where: Prisma.TournamentWhereInput = {}): Promise<number> {
        return this.prisma.tournament.count({
            where,
        });
    }

    async createTournament(data: Prisma.TournamentCreateInput): Promise<Tournament> {
        return this.prisma.tournament.create({
            data,
            include: {
                format: true,
                rules: true,
                teams: true,
                tournamentType: true,
            },
        });
    }

    async updateTournament(params: {
        where: Prisma.TournamentWhereUniqueInput;
        data: Prisma.TournamentUpdateInput;
    }): Promise<Tournament> {
        const { where, data } = params;
        return this.prisma.tournament.update({
            data,
            where,
            include: {
                format: true,
                rules: true,
                teams: true,
                tournamentType: true,
            },
        });
    }

    async addParticipants(tournamentId: number, participants: number[]): Promise<Tournament> {
        const tournament = await this.loadTournament({ id: tournamentId });
        if (tournament && tournament.closed) {
            throw new HttpException(
                {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    error: 'This tournament is already closed',
                },
                HttpStatus.UNPROCESSABLE_ENTITY
            );
        }
        return this.updateTournament({
            data: {
                teams: {
                    connect: participants.map((id) => ({ id })),
                },
            },
            where: {
                id: tournamentId,
            },
        });
    }

    private computeNearestPowerOf2(x: number) {
        if (x <= 0) {
            // If x <= 0, directly return 2 to the 0 power
            return 1;
        } else if ((x & (x - 1)) == 0) {
            // Judging by the "bitwise AND" operation, if x is a power of 2, directly return x
            return x;
        } else {
            // Calculate the smallest integer greater than the logarithm of x with base 2
            // For example, x = 25, the logarithm of 25 with 2 as the base is 4.643..., the result of forcibly converting to int and adding 1 is 5
            const n = Math.trunc(Math.log(x) / Math.log(2)) + 1;
            return Math.pow(2, n);
        }
    }

    private computeRoundParticipants(participants: number, perfectParticipantsNumber: number): number {
        return 2 * participants - perfectParticipantsNumber;
    }

    private computeRoundMatchs(participants: number, perfectParticipantsNumber: number): number {
        return participants - perfectParticipantsNumber / 2;
    }

    async closeRegistration(tournamentId: number): Promise<Tournament> {
        const tournament: Partial<TournamentModel> = await this.loadTournament({ id: tournamentId });
        if (!tournament) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: `Tournament ${tournamentId} not found`,
                },
                HttpStatus.NOT_FOUND
            );
        }
        const perfectParticipantsNumber = this.computeNearestPowerOf2(tournament.teams.length);
        const firstRoundParticipantsNumber = this.computeRoundParticipants(tournament.teams.length, perfectParticipantsNumber);
        const firstRoundRestNumber = perfectParticipantsNumber - tournament.teams.length;
        const firstRoundMatchsNumber = this.computeRoundMatchs(tournament.teams.length, perfectParticipantsNumber);
        const nextRoundParticipantsNumber = perfectParticipantsNumber / 2;
        const firstRoundParticipants = [];
        const pool = tournament.teams;
        for (let i = 0; i < firstRoundParticipantsNumber; i++) {
            const [team] = pool.splice(getRandomInt(pool.length - 1, 0), 1);
            firstRoundParticipants.push(team);
        }
        const round = await this.prisma.round.create({
            data: {
                rank: 1,
                tournament: {
                    connect: {
                        id: tournament.id,
                    },
                },
            },
        });
        const firstRoundMatchs = [];
        let match: CreateMatchInput = new CreateMatchInput(null, null, null);
        for (let i = 0; i < firstRoundMatchsNumber; i++) {
            const [teamA] = firstRoundParticipants.splice(getRandomInt(firstRoundParticipants.length - 1, 0), 1);
            const [teamB] = firstRoundParticipants.splice(getRandomInt(firstRoundParticipants.length - 1, 0), 1);
            match = new CreateMatchInput(teamA.id, teamB.id, round.id);
            firstRoundMatchs.push(match);
        }
        for (const match of firstRoundMatchs) {
            await this.matchService.createMatch({
                round: { connect: { id: match.round } },
                teamA: { connect: { id: match.teamA } },
                teamB: { connect: { id: match.teamB } },
            });
        }
        const createdMatchs = await this.prisma.match.findMany({ where: { round: { id: round.id } } });
        return this.updateTournament({
            data: {
                closed: true,
            },
            where: {
                id: tournamentId,
            },
        });
    }

    async deleteTournament(where: Prisma.TournamentWhereUniqueInput): Promise<Tournament> {
        return this.prisma.tournament.delete({
            where,
            include: {
                format: true,
                rules: true,
                teams: true,
                tournamentType: true,
            },
        });
    }
}
