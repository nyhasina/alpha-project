import { Module } from '@nestjs/common';
import { MinioClientModule } from '../minio/minio-client.module';
import { PrismaService } from '../prisma/prisma.service';
import { UploadResolver } from './upload.resolver';
import { UploadService } from './upload.service';

@Module({
    imports: [MinioClientModule],
    providers: [PrismaService, UploadResolver, UploadService],
})
export class UploadModule {}
