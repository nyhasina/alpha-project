import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PlatformModel {
  id: number;
  name: string;
}
