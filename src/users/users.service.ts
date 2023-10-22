import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { genSalt, hash } from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUserByName(username: string) {
    return await this.userModel.findOne({ username });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async createUser(username: string, password: string, provider: string = "email", displayName: string | undefined = undefined) {
    return await this.userModel.create({
      username,
      password: await hash(password, await genSalt()),
      provider,
      displayName: displayName || username
    });
  }
}
