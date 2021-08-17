import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

constructor(private jwtService: JwtService, private usersService: UsersService) {}

async validateUser(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);
    if (user && user.password === password) {
    const {password, ...result } = user;
    return result;
    }
    return null;
}

async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
    access_token: this.jwtService.sign(payload),
    };
}
}