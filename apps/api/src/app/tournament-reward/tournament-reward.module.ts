import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TournamentRewardResolver } from './tournament-reward.resolver';
import { TournamentRewardService } from './tournament-reward.service';

@Module({
    providers: [PrismaService, TournamentRewardResolver, TournamentRewardService],
})
export class TournamentRewardModule {}
