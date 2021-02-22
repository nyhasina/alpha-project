import { Injectable } from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamService {
    constructor(private prisma: PrismaService) {}

    async loadTeam(where: Prisma.TeamWhereUniqueInput): Promise<Team | null> {
        return this.prisma.team.findUnique({
            where,
            include: {
                owner: true,
                members: true,
            },
        });
    }

    async loadTeams(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TeamWhereUniqueInput;
        where?: Prisma.TeamWhereInput;
        orderBy?: Prisma.TeamOrderByInput;
    }): Promise<Team[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.team.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                owner: true,
                members: true,
            },
        });
    }

    async count(where: Prisma.TeamWhereInput = {}): Promise<number> {
        return this.prisma.team.count({
            where,
        });
    }

    async createTeam(data: Prisma.TeamCreateInput): Promise<Team> {
        return this.prisma.team.create({
            data,
            include: {
                owner: true,
                members: true,
            },
        });
    }

    async updateTeam(params: { where: Prisma.TeamWhereUniqueInput; data: Prisma.TeamUpdateInput }): Promise<Team> {
        const { where, data } = params;
        return this.prisma.team.update({
            data,
            where,
            include: {
                owner: true,
                members: true,
            },
        });
    }

    async deleteTeam(where: Prisma.TeamWhereUniqueInput): Promise<Team> {
        return this.prisma.team.delete({
            where,
            include: {
                owner: true,
                members: true,
            },
        });
    }
}
