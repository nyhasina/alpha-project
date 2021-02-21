import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CurrencyService } from './currency.service';
import { CurrencyResolver } from './currency.resolver';

@Module({
  providers: [PrismaService, CurrencyService, CurrencyResolver]
})
export class CurrencyModule {}
