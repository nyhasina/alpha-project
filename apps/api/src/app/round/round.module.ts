import { Module } from '@nestjs/common';
import { MatchService } from '../match/match.service';
import { PrismaService } from '../prisma/prisma.service';
import { TournamentService } from '../tournament/tournament.service';
import { RoundResolver } from './round.resolver';
import { RoundService } from './round.service';

@Module({
    providers: [PrismaService, RoundResolver, RoundService, TournamentService, MatchService],
})
export class RoundModule {}
