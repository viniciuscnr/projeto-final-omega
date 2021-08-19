import { Injectable, Req } from "@nestjs/common";
import jwt_decode from "jwt-decode";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()

export class Decoder{
    constructor(private usersService: UsersService) {}

    async decode(@Req() req) {
        const jwt = req.headers.authorization.replace('Bearer ', '');
        const payload = jwt_decode(jwt);
        const userEmail = await payload[Object.keys(payload)[0]]; 
        const user: User = await this.usersService.getByEmail(userEmail);
        return user.id
    }
}