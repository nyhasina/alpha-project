import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PoliticService } from './politic.service';
import { PoliticResolver } from './politic.resolver';

@Module({
  providers: [PrismaService, PoliticService, PoliticResolver]
})
export class PoliticModule {}
