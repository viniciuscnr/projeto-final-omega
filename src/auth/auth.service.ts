import { UsersService } from 'src/users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

constructor(private jwtService: JwtService, private usersService: UsersService) {}

async validateUser(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);
    if (user && user.password === password) {
        return true;
    }
    return false;
}

async login(user: any) {
    let result = await this.usersService.getByEmail(user.email)
    if(result){
        let validation = await this.validateUser(user.email, user.password);
        if (validation) {
            const payload = { email: result.email, sub: result.id };
            return {access_token: this.jwtService.sign(payload)}}
        else{
            return {"message":"erro de credenciais"}
            }
        }
    }
}
