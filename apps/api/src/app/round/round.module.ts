import { Module } from '@nestjs/common';
import { MatchService } from '../match/match.service';
import { PrismaService } from '../prisma/prisma.service';
import { TournamentService } from '../tournament/tournament.service';
import { RoundService } from './round.service';

@Module({
    providers: [PrismaService, RoundService, TournamentService, MatchService],
})
export class RoundModule {}
