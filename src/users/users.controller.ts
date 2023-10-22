import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':username')
    async getUser(@Param("username") username: string) {
        return await this.usersService.findUserByName(username)
    }

    /* ADMIN REGION */
    @Get('all')
    @Roles(Role.Admin)
    async getAllUsers() {
        return await this.usersService.findAll()
    }
}
