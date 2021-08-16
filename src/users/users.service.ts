import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity'
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { SessionService } from './session.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private session: SessionService) {}

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
    
    async login(loginDto: LoginDto) {

        const user = await this.userRepository.findOne({email : loginDto.email})

        if(!user) throw new NotFoundException(`The email provided is not linked to any user`)

        if(user.password != loginDto.password) throw new UnauthorizedException(`Password incorrect`)

        this.session.add(user.email)
    }

    logout(loginDto: LoginDto){
        this.session.remove(loginDto.email)
    }

}
