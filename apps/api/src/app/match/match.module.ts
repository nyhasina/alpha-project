import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoundService } from '../round/round.service';
import { TeamService } from '../team/team.service';
import { MatchService } from './match.service';

@Module({
    providers: [PrismaService, MatchService, TeamService, RoundService],
})
export class MatchModule {}
