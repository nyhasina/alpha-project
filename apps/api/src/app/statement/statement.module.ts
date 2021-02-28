import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatementResolver } from './statement.resolver';
import { StatementService } from './statement.service';

@Module({
    providers: [PrismaService, StatementResolver, StatementService],
})
export class StatementModule {}
