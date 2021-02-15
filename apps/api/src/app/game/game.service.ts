import { Injectable } from '@nestjs/common';
import { Game, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GameService {
    constructor(private prisma: PrismaService) {}

    async loadGame(where: Prisma.GameWhereUniqueInput): Promise<Game | null> {
        return this.prisma.game.findUnique({
            where,
            include: {
                platforms: true,
            },
        });
    }

    async loadGames(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.GameWhereUniqueInput;
        where?: Prisma.GameWhereInput;
        orderBy?: Prisma.GameOrderByInput;
    }): Promise<Game[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.game.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                platforms: true,
            },
        });
    }

    async createGame(data: Prisma.GameCreateInput): Promise<Game> {
        return this.prisma.game.create({
            data,
        });
    }

    async updateGame(params: { where: Prisma.GameWhereUniqueInput; data: Prisma.GameUpdateInput }): Promise<Game> {
        const { where, data } = params;
        return this.prisma.game.update({
            data,
            where,
        });
    }

    async deleteGame(where: Prisma.GameWhereUniqueInput): Promise<Game> {
        return this.prisma.game.delete({
            where,
        });
    }
}
