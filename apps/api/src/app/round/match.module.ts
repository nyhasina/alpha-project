import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MatchService } from './match.service';

@Module({
    providers: [PrismaService, MatchService],
})
export class MatchModule {}
