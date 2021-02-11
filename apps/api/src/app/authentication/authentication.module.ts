import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { JWT_CONSTANTS } from './authentication.constants';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [PassportModule, JwtModule.register({ secret: JWT_CONSTANTS.secret, signOptions: { expiresIn: '3600s' } })],
    providers: [
        PrismaService,
        AuthenticationResolver,
        AuthenticationService,
        UserService,
        LocalStrategy,
        JwtStrategy,
        AuthenticationResolver,
    ],
    exports: [AuthenticationService],
})
export class AuthenticationModule {}
