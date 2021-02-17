import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadModel {
    @Field((type) => Int)
    id: number;

    @Field({ nullable: true })
    filename?: string;
}
export interface BufferedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: AppMimeType;
    size: number;
    buffer: Buffer | string;
  } 
  export type AppMimeType =
  | 'image/png'
  | 'image/jpeg';