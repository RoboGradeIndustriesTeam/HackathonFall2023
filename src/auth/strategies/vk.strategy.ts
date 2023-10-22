import { Params, Profile, Strategy, VerifyCallback } from "passport-vkontakte";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class VKStrategy extends PassportStrategy(Strategy, "vkontakte") {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private cfg: ConfigService
  ) {
    super({
      clientID: +cfg.get("VK_CLIENT_ID"),
      clientSecret: cfg.get("VK_CLIENT_SECRET"),
      callbackURL: cfg.get("VK_REDIRECT"),
      scope: ["profile"],
    }, async (
      accessToken: string,
      refreshToken: string,
      params: Params,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      const uU = `vk-${profile.id}`;
      const uC = await this.usersService.findUserByName(uU);
      if (uC) return done(null, uC);
      
      // Здесь устанавливается такой пароль просто для филлера
      const nU = await this.usersService.createUser(uU, `no-password`, "vkontakte", `${profile.displayName}`);
      done(null, nU);
    });
  }
}
