import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthenticationModel {
    @Field()
    token: string;

    @Field()
    refreshToken: string;

    constructor(token?: string, refreshToken?: string) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
}
