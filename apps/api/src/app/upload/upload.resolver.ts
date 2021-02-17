import { BufferedFile } from './upload.model';
import { UploadService } from './upload.service';
import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller('file-upload')
export class UploadResolver {
  constructor(
    private fileUploadService: UploadService
  ) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingle(
    @UploadedFile() image: BufferedFile
  ) {
    return await this.fileUploadService.uploadSingle(image)
  }
}
