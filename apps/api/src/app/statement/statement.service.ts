import { Injectable } from '@nestjs/common';
import { Prisma, Statement } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatementService {
    constructor(private prisma: PrismaService) {}

    async loadStatement(where: Prisma.StatementWhereUniqueInput): Promise<Statement | null> {
        return this.prisma.statement.findUnique({
            where,
        });
    }

    async loadStatements(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.StatementWhereUniqueInput;
        where?: Prisma.StatementWhereInput;
        orderBy?: Prisma.StatementOrderByInput;
    }): Promise<Statement[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.statement.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async count(where: Prisma.StatementWhereInput = {}): Promise<number> {
        return this.prisma.statement.count({
            where,
        });
    }

    async createStatement(data: Prisma.StatementCreateInput): Promise<Statement> {
        return this.prisma.statement.create({
            data,
        });
    }

    async updateStatement(params: {
        where: Prisma.StatementWhereUniqueInput;
        data: Prisma.StatementUpdateInput;
    }): Promise<Statement> {
        const { where, data } = params;
        return this.prisma.statement.update({
            data,
            where,
        });
    }

    async deleteStatement(where: Prisma.StatementWhereUniqueInput): Promise<Statement> {
        return this.prisma.statement.delete({
            where,
        });
    }
}
