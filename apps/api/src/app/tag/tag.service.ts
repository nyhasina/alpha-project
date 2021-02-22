import { Injectable } from '@nestjs/common';
import { Prisma, Tag } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagService {
    constructor(private prisma: PrismaService) {}

    async loadTag(where: Prisma.TagWhereUniqueInput): Promise<Tag | null> {
        return this.prisma.tag.findUnique({
            where,
        });
    }

    async loadTags(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TagWhereUniqueInput;
        where?: Prisma.TagWhereInput;
        orderBy?: Prisma.TagOrderByInput;
    }): Promise<Tag[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.tag.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async count(where: Prisma.TagWhereInput = {}): Promise<number> {
        return this.prisma.tag.count({
            where,
        });
    }

    async createTag(data: Prisma.TagCreateInput): Promise<Tag> {
        return this.prisma.tag.create({
            data,
        });
    }

    async updateTag(params: { where: Prisma.TagWhereUniqueInput; data: Prisma.TagUpdateInput }): Promise<Tag> {
        const { where, data } = params;
        return this.prisma.tag.update({
            data,
            where,
        });
    }

    async deleteTag(where: Prisma.TagWhereUniqueInput): Promise<Tag> {
        return this.prisma.tag.delete({
            where,
        });
    }
}
