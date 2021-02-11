import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {
    constructor(private userService: UserService) {}

    async validateUserCredential(email: string, password: string): Promise<User | null> {
        const user: User = await this.userService.loadUser({ email });
        const hash = await this.userService.encrypt(password);
        if (user && user.password === hash) {
            const { password, ...rest } = user;
            return rest;
        }
        return null;
    }
}
