import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LanguageService } from './language.service';
import { LanguageResolver } from './language.resolver';

@Module({
  providers: [PrismaService, LanguageService, LanguageResolver]
})
export class LanguageModule {}
