import { Injectable } from '@nestjs/common';
import { Language, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LanguageService {
    constructor(private prisma: PrismaService) {}

    async loadLanguage(where: Prisma.LanguageWhereUniqueInput): Promise<Language | null> {
        return this.prisma.language.findUnique({
            where,
        });
    }

    async loadLanguages(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.LanguageWhereUniqueInput;
        where?: Prisma.LanguageWhereInput;
        orderBy?: Prisma.LanguageOrderByInput;
    }): Promise<Language[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.language.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createLanguage(data: Prisma.LanguageCreateInput): Promise<Language> {
        return this.prisma.language.create({
            data,
        });
    }

    async updateLanguage(params: {
        where: Prisma.LanguageWhereUniqueInput;
        data: Prisma.LanguageUpdateInput;
    }): Promise<Language> {
        const { where, data } = params;
        return this.prisma.language.update({
            data,
            where,
        });
    }

    async deleteLanguage(where: Prisma.LanguageWhereUniqueInput): Promise<Language> {
        return this.prisma.language.delete({
            where,
        });
    }
}
