import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoundService } from './round.service';

@Module({
    providers: [PrismaService, RoundService],
})
export class RoundModule {}
