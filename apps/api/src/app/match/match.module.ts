import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoundService } from '../round/round.service';
import { TeamService } from '../team/team.service';
import { MatchResolver } from './match.resolver';
import { MatchService } from './match.service';

@Module({
    providers: [PrismaService, MatchResolver, MatchService, TeamService, RoundService],
})
export class MatchModule {}
