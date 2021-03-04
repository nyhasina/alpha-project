import { Injectable } from '@nestjs/common';
import { Round, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoundService {
    constructor(private prisma: PrismaService) {}

    async loadRound(where: Prisma.RoundWhereUniqueInput): Promise<Round | null> {
        return this.prisma.round.findUnique({
            where,
            include: {
                matchs: true,
                tournament: true,
            },
        });
    }

    async loadRounds(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.RoundWhereUniqueInput;
        where?: Prisma.RoundWhereInput;
        orderBy?: Prisma.RoundOrderByInput;
    }): Promise<Round[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.round.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                matchs: true,
                tournament: true,
            },
        });
    }

    async count(where: Prisma.RoundWhereInput = {}): Promise<number> {
        return this.prisma.round.count({
            where,
        });
    }

    async createRound(data: Prisma.RoundCreateInput): Promise<Round> {
        return this.prisma.round.create({
            data,
            include: {
                matchs: true,
                tournament: true,
            },
        });
    }

    async updateRound(params: { where: Prisma.RoundWhereUniqueInput; data: Prisma.RoundUpdateInput }): Promise<Round> {
        const { where, data } = params;
        return this.prisma.round.update({
            data,
            where,
            include: {
                matchs: true,
                tournament: true,
            },
        });
    }

    async deleteRound(where: Prisma.RoundWhereUniqueInput): Promise<Round> {
        return this.prisma.round.delete({
            where,
            include: {
                matchs: true,
                tournament: true,
            },
        });
    }
}
