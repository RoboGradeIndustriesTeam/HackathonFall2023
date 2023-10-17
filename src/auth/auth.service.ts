import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import {compare} from "bcryptjs";
import { User } from "../users/schemas/user.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUserByName(username);
    if (user && compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
