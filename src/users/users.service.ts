import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity'
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) {}

    findAll() {
        return this.userRepository.find();
    }

    searchById(id:string) {
        const user = this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`User of ID ${id} not found`);
        } else {
            return user;
        }
    }

    signUp(signUpDto: SignUpDto) {
        const user = this.userRepository.create(signUpDto);
        return this.userRepository.save(user);
    }

    async deleteUser(id:string) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`User of ID ${id} not found`);
        } else {
            return this.userRepository.remove(user);
        }
    }
}
