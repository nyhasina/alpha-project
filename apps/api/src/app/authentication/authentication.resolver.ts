import { Args, ArgsType, Field, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../shared/decorators/is-public.decorator';
import { AuthenticationModel } from './authentication.model';
import { AuthenticationService } from './authentication.service';

@ArgsType()
class AuthenticationPayload {
    @Field()
    email: string;

    @Field()
    password: string;
}

@Resolver((of) => AuthenticationModel)
export class AuthenticationResolver {
    constructor(private authenticationService: AuthenticationService, private jwtService: JwtService) {}

    @Public()
    @Mutation((of) => AuthenticationModel)
    async login(@Args() payload: AuthenticationPayload) {
        const { email, password } = payload;
        const user = await this.authenticationService.validateUserCredential(email, password);
        if (!user) {
            throw new Error('Email or password is invalid');
        }
        const token = await this.jwtService.sign({ ...user });
        const response = new AuthenticationModel(token);
        return response;
    }
}
