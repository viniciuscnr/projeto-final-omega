import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async searchById(id:string) {
        const user = await this.userRepository.findOne(id);
        console.log(user)
        if (!user) {
            throw new NotFoundException(`User of ID ${id} not found`);
        } else {
            return user;
        }
    }

    async signUp(signUpDto: SignUpDto) {
        let verify = await this.getByEmail(signUpDto.email);
        if(verify){
            throw new BadRequestException(`O email fornecido já está registrado`)
        }
        if (signUpDto.name.length < 3){
            throw new BadRequestException(`O nome fornecido é curto demais`)
        }
        if (signUpDto.password.length < 8){
            throw new BadRequestException(`A senha fornecida é curta demais`)
        }
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
    
    async getByEmail(email: string) {
        return await this.userRepository.findOne({email})
    }
}