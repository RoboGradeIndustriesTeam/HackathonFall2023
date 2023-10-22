import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersService } from "src/users/users.service";
import { VKStrategy } from "./strategies/vk.strategy";
import { YandexStrategy } from "./strategies/yandex.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
        inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get("JWT_SECRET"),
        signOptions: { expiresIn: "360d" },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService, VKStrategy, YandexStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
