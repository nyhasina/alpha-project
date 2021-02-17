import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadResolver } from './upload.resolver';
import { UploadService } from './upload.service';

@Module({
    providers: [PrismaService, UploadResolver, UploadService],
})
export class UploadModule {}
