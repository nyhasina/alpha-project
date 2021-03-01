import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RuleResolver } from './rule.resolver';
import { RuleService } from './rule.service';

@Module({
    providers: [PrismaService, RuleResolver, RuleService],
})
export class RuleModule {}
