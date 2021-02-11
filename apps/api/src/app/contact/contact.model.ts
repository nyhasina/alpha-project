import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../shared/models/base.model';

@ObjectType()
export class ContactModel extends BaseModel {
    @Field()
    forename: string;

    @Field()
    surname: string;
}
