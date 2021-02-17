import { MinioClientService } from './../minio/minio-client.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BufferedFile } from './upload.model';

@Injectable()
export class UploadService {
  constructor(
    private prisma: PrismaService,
    private minioClientService: MinioClientService) {}
    async uploadSingle(image: BufferedFile) {

      let uploaded_image = await this.minioClientService.upload(image)
  
      return {
        image_url: uploaded_image.url,
        message: "Successfully uploaded to MinIO S3"
      }
    }
}
