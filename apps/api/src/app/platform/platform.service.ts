import { Injectable } from '@nestjs/common';
import { Platform, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlatformService {
    constructor(private prisma: PrismaService) {}

    async loadPlatform(where: Prisma.PlatformWhereUniqueInput): Promise<Platform | null> {
        return this.prisma.platform.findUnique({
            where,
        });
    }

    async loadPlatforms(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PlatformWhereUniqueInput;
        where?: Prisma.PlatformWhereInput;
        orderBy?: Prisma.PlatformOrderByInput;
    }): Promise<Platform[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.platform.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createPlatform(data: Prisma.PlatformCreateInput): Promise<Platform> {
        return this.prisma.platform.create({
            data,
        });
    }

    async updatePlatform(params: {
        where: Prisma.PlatformWhereUniqueInput;
        data: Prisma.PlatformUpdateInput;
    }): Promise<Platform> {
        const { where, data } = params;
        return this.prisma.platform.update({
            data,
            where,
        });
    }

    async deletePlatform(where: Prisma.PlatformWhereUniqueInput): Promise<Platform> {
        return this.prisma.platform.delete({
            where,
        });
    }
}
