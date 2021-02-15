import { Module } from '@nestjs/common';
import { PlatformService } from '../platform/platform.service';
import { PrismaService } from '../prisma/prisma.service';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';

@Module({
    providers: [PrismaService, GameResolver, GameService, PlatformService],
})
export class GameModule {}
