import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationService) {
    super();
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.authService.validateUserCredential(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
