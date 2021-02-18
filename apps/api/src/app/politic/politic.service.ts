import { Injectable } from '@nestjs/common';
import { Prisma, Politic } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PoliticService {
    constructor(private prisma: PrismaService) {}
    async loadPolitic(where: Prisma.PoliticWhereUniqueInput): Promise<Politic | null> {
        return this.prisma.politic.findUnique({
            where,
        });
    }
    async loadPolitics(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PoliticWhereUniqueInput;
        where?: Prisma.PoliticWhereInput;
        orderBy?: Prisma.PoliticOrderByInput;
    }): Promise<Politic[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.politic.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createPolitic(data: Prisma.PoliticCreateInput): Promise<Politic> {
        return this.prisma.politic.create({
            data,
        });
    }

    async updatePolitic(params: { where: Prisma.PoliticWhereUniqueInput; data: Prisma.PoliticUpdateInput }): Promise<Politic> {
        const { where, data } = params;
        return this.prisma.politic.update({
            data,
            where,
        });
    }

    async deletePolitic(where: Prisma.PoliticWhereUniqueInput): Promise<Politic> {
        return this.prisma.politic.delete({
            where,
        });
    }
}