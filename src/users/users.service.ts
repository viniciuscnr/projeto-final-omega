import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity'
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class UsersService {
    private users: User[] = [
    ];

    findAll() {
        return this.users;
    }

    searchById(id:string) {
        const user = this.users.find((user: User) => user.id === id);
        if (!user) {
            throw new HttpException(`User of ID ${id} not found`,HttpStatus.NOT_FOUND);
        } else {
            return user;
        }
    }

    signUp(signUpDto: SignUpDto) {
        this.users.push(signUpDto);
    }

    deleteUser(id:string) {
        const userIndex = this.users.findIndex((user: User) => user.id === id);
        if (userIndex >= 0) {
            this.users.splice(userIndex, 1);
        }
    }
}
