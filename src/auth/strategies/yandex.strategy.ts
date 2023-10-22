import {Profile, Strategy, Callback } from "passport-yandex";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, "yandex") {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private cfg: ConfigService
  ) {
    super({
      clientID: cfg.get("YANDEX_CLIENT_ID"),
      clientSecret: cfg.get("YANDEX_CLIENT_SECRET"),
      callbackURL: cfg.get("YANDEX_REDIRECT")
    }, async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done,
    ) => {
      const uU = `ya-${profile.id}`;
      const uC = await this.usersService.findUserByName(uU);
      if (uC) return done(null, uC);
      
      // Здесь устанавливается такой пароль просто для филлера
      const nU = await this.usersService.createUser(uU, `no-password`, "yandex", `${profile.displayName}`);
      done(null, nU);
    });
  }
}
