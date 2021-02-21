import { Module } from '@nestjs/common';
import { CurrencyService } from '../currency/currency.service';
import { LanguageService } from '../language/language.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';

@Module({
    providers: [PrismaService, ProfileService, ProfileResolver, LanguageService, CurrencyService],
})
export class ProfileModule {}
