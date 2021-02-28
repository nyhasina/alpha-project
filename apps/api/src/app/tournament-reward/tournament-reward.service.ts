import { Injectable } from '@nestjs/common';
import { Prisma, TournamentReward } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TournamentRewardService {
    constructor(private prisma: PrismaService) {}

    async loadTournamentReward(where: Prisma.TournamentRewardWhereUniqueInput): Promise<TournamentReward | null> {
        return this.prisma.tournamentReward.findUnique({
            where,
            include: {
                types: true,
            },
        });
    }

    async loadTournamentRewards(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TournamentRewardWhereUniqueInput;
        where?: Prisma.TournamentRewardWhereInput;
        orderBy?: Prisma.TournamentRewardOrderByInput;
    }): Promise<TournamentReward[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.tournamentReward.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                types: true,
            },
        });
    }

    async count(where: Prisma.TournamentRewardWhereInput = {}): Promise<number> {
        return this.prisma.tournamentReward.count({
            where,
        });
    }

    async createTournamentReward(data: Prisma.TournamentRewardCreateInput): Promise<TournamentReward> {
        return this.prisma.tournamentReward.create({
            data,
            include: {
                types: true,
            },
        });
    }

    async updateTournamentReward(params: {
        where: Prisma.TournamentRewardWhereUniqueInput;
        data: Prisma.TournamentRewardUpdateInput;
    }): Promise<TournamentReward> {
        const { where, data } = params;
        return this.prisma.tournamentReward.update({
            data,
            where,
            include: {
                types: true,
            },
        });
    }

    async deleteTournamentReward(where: Prisma.TournamentRewardWhereUniqueInput): Promise<TournamentReward> {
        return this.prisma.tournamentReward.delete({
            where,
            include: {
                types: true,
            },
        });
    }
}
