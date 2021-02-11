import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(private userService: UserService) {}

    async validateUserCredential(email: string, password: string): Promise<User | null> {
        const user: User = await this.userService.loadUser({ email });
        if (!user) {
            return null;
        }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
            return null;
        }
        return { ...user, password: undefined };
    }
}
