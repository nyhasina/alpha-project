import { Injectable } from '@nestjs/common';
import { Prisma, TournamentType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TournamentTypeService {
    constructor(private prisma: PrismaService) {}

    async loadTournamentType(where: Prisma.TournamentTypeWhereUniqueInput): Promise<TournamentType | null> {
        return this.prisma.tournamentType.findUnique({
            where,
        });
    }

    async loadTournamentTypes(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TournamentTypeWhereUniqueInput;
        where?: Prisma.TournamentTypeWhereInput;
        orderBy?: Prisma.TournamentTypeOrderByInput;
    }): Promise<TournamentType[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.tournamentType.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async count(where: Prisma.TournamentTypeWhereInput = {}): Promise<number> {
        return this.prisma.tournamentType.count({
            where,
        });
    }

    async createTournamentType(data: Prisma.TournamentTypeCreateInput): Promise<TournamentType> {
        return this.prisma.tournamentType.create({
            data,
        });
    }

    async updateTournamentType(params: {
        where: Prisma.TournamentTypeWhereUniqueInput;
        data: Prisma.TournamentTypeUpdateInput;
    }): Promise<TournamentType> {
        const { where, data } = params;
        return this.prisma.tournamentType.update({
            data,
            where,
        });
    }

    async deleteTournamentType(where: Prisma.TournamentTypeWhereUniqueInput): Promise<TournamentType> {
        return this.prisma.tournamentType.delete({
            where,
        });
    }
}
