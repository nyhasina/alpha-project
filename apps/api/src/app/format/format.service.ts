import { Injectable } from '@nestjs/common';
import { Format, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FormatService {
    constructor(private prisma: PrismaService) {}

    async loadFormat(where: Prisma.FormatWhereUniqueInput): Promise<Format | null> {
        return this.prisma.format.findUnique({
            where,
        });
    }

    async loadFormats(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.FormatWhereUniqueInput;
        where?: Prisma.FormatWhereInput;
        orderBy?: Prisma.FormatOrderByInput;
    }): Promise<Format[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.format.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async count(where: Prisma.FormatWhereInput = {}): Promise<number> {
        return this.prisma.format.count({
            where,
        });
    }

    async createFormat(data: Prisma.FormatCreateInput): Promise<Format> {
        return this.prisma.format.create({
            data,
        });
    }

    async updateFormat(params: { where: Prisma.FormatWhereUniqueInput; data: Prisma.FormatUpdateInput }): Promise<Format> {
        const { where, data } = params;
        return this.prisma.format.update({
            data,
            where,
        });
    }

    async deleteFormat(where: Prisma.FormatWhereUniqueInput): Promise<Format> {
        return this.prisma.format.delete({
            where,
        });
    }
}
