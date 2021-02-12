import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthenticationModel {
    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;

    constructor(accessToken?: string, refreshToken?: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
