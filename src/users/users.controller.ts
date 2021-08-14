import { Body, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { UsersService} from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    searchById(@Param('id') id: string) {
        return this.usersService.searchById(id);
    }

    @Post()
    signUp(@Body() user: SignUpDto) {
        return this.usersService.signUp(user);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(id);
    }

}
