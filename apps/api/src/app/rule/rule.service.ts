import { Injectable } from '@nestjs/common';
import { Prisma, Rule } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RuleService {
    constructor(private prisma: PrismaService) {}

    async loadRule(where: Prisma.RuleWhereUniqueInput): Promise<Rule | null> {
        return this.prisma.rule.findUnique({
            where,
        });
    }

    async loadRules(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.RuleWhereUniqueInput;
        where?: Prisma.RuleWhereInput;
        orderBy?: Prisma.RuleOrderByInput;
    }): Promise<Rule[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.rule.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async count(where: Prisma.RuleWhereInput = {}): Promise<number> {
        return this.prisma.rule.count({
            where,
        });
    }

    async createRule(data: Prisma.RuleCreateInput): Promise<Rule> {
        return this.prisma.rule.create({
            data,
        });
    }

    async updateRule(params: {
        where: Prisma.RuleWhereUniqueInput;
        data: Prisma.RuleUpdateInput;
    }): Promise<Rule> {
        const { where, data } = params;
        return this.prisma.rule.update({
            data,
            where,
        });
    }

    async deleteRule(where: Prisma.RuleWhereUniqueInput): Promise<Rule> {
        return this.prisma.rule.delete({
            where,
        });
    }
}
