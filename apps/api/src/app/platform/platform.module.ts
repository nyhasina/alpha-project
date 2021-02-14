import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlatformService } from './platform.service';
import { PlatformResolver } from './platform.resolver';

@Module({
  providers: [PrismaService, PlatformService, PlatformResolver]
})
export class PlatformModule {}
