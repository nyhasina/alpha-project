import { Injectable } from '@nestjs/common';
import { Match, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchService {
    constructor(private prisma: PrismaService) {}

    async loadMatch(where: Prisma.MatchWhereUniqueInput): Promise<Match | null> {
        return this.prisma.match.findUnique({
            where,
        });
    }

    async loadMatchs(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.MatchWhereUniqueInput;
        where?: Prisma.MatchWhereInput;
        orderBy?: Prisma.MatchOrderByInput;
    }): Promise<Match[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.match.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async count(where: Prisma.MatchWhereInput = {}): Promise<number> {
        return this.prisma.match.count({
            where,
        });
    }

    async createMatch(data: Prisma.MatchCreateInput): Promise<Match> {
        return this.prisma.match.create({
            data,
        });
    }

    async updateMatch(params: { where: Prisma.MatchWhereUniqueInput; data: Prisma.MatchUpdateInput }): Promise<Match> {
        const { where, data } = params;
        return this.prisma.match.update({
            data,
            where,
        });
    }

    async deleteMatch(where: Prisma.MatchWhereUniqueInput): Promise<Match> {
        return this.prisma.match.delete({
            where,
        });
    }
}
