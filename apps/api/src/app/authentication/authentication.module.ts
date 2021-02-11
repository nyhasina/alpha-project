import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [PassportModule],
    providers: [PrismaService, UserService, AuthenticationService, LocalStrategy],
})
export class AuthenticationModule {}
