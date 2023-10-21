import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':username')
    async getUser(@Param("username") username: string) {
        return await this.usersService.findUserByName(username)
    }
}
