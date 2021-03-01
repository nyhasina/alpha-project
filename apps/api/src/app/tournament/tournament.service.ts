import { Injectable } from '@nestjs/common';
import { Prisma, Tournament } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

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
