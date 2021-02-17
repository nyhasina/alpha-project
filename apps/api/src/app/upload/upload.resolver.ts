import { ArgsType, Field, Resolver } from '@nestjs/graphql';
import { UploadModel } from './upload.model';
import { UploadService } from './upload.service';
import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@ArgsType()
export class CreateUploadInput {
    @Field()
    filename: string;
}

@Resolver((of) => UploadModel)
export class UploadResolver {
    constructor(private uploadService: UploadService) {}
    @Post("upload")
    @UseInterceptors(FileInterceptor("photo", { dest: "./uploads" }))
    uploadSingle(@UploadedFile() file) {
      console.log(file);
    }
}
