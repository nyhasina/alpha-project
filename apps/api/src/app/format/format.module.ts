import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FormatResolver } from './format.resolver';
import { FormatService } from './format.service';

@Module({
    providers: [PrismaService, FormatResolver, FormatService],
})
export class FormatModule {}
