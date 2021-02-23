import { Injectable } from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamInput } from './team.resolver';

@Injectable()
export class TeamService {
    constructor(private prisma: PrismaService) {}

    async loadTeam(where: Prisma.TeamWhereUniqueInput): Promise<Team | null> {
        return this.prisma.team.findUnique({
            where,
            include: {
                owner: true,
                members: true,
                tag: true,
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
                tag: true,
            },
        });
    }

    async count(where: Prisma.TeamWhereInput = {}): Promise<number> {
        return this.prisma.team.count({
            where,
        });
    }

    async createTeam(input: CreateTeamInput): Promise<Team> {
        const { name, tag, owner, members } = input;
        let data: Prisma.TeamCreateInput = {
            name,
            owner: {
                connect: {
                    id: owner,
                },
            },
            members: {
                connect: [
                    {
                        id: owner,
                    },
                    ...(members || []).map((item) => ({ id: item })),
                ],
            },
        };
        if (tag && tag.trim()) {
            data = {
                ...data,
                tag: {
                    connectOrCreate: {
                        where: {
                            name: tag.trim().toLowerCase(),
                        },
                        create: {
                            name: tag.trim().toLowerCase(),
                        },
                    },
                },
            };
        }
        return this.prisma.team.create({
            data,
            include: {
                owner: true,
                members: true,
                tag: true,
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
                tag: true,
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
