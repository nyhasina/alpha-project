import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Tournament } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TournamentModel } from './tournament.model';

@Injectable()
export class TournamentService {
    constructor(private prisma: PrismaService) {}

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

    private async computeRounds(teams: number, teamPerMatch: number): Promise<number> {
        if (teams <= 1) {
            return 0;
        }
        teams = Math.trunc(teams / teamPerMatch);
        return teams + await this.computeRounds(teams, teamPerMatch);
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
        console.log(`${tournament.teams.map((item) => item.id).join(',')}: ${tournament.teams.length}`);
        const nextPowerOf2 = this.computeNearestPowerOf2(tournament.teams.length);
        console.log(nextPowerOf2 - tournament.teams.length);
        console.log(await this.computeRounds(tournament.teams.length, 2));
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
