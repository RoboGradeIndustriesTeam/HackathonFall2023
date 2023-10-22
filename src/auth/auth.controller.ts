import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { UsersService } from "src/users/users.service";
import { AuthGuard } from "@nestjs/passport";
import { VKAuthGuard } from "./guards/vk.guard";
import { YandexAuthGuard } from "./guards/yandex.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    if (req.user.provider !== "email") throw new UnauthorizedException();
    return this.authService.login(req.user);
  }

  // костыль чтобы правильно сохранить redirect url
  // так как useguards vkauthguard мгновенно перебросит игнорируя контроллер
  @Get("oauth/vk")
  @Redirect("/auth/oauth/vk_")
  async vkPre(@Request() req, @Query("redirect") redirect: string) {
    req.session.redirect = redirect;
    return;
  }

  @Get("oauth/ya")
  @Redirect("/auth/oauth/ya_")
  async yaPre(@Request() req, @Query("redirect") redirect: string) {
    req.session.redirect = redirect;
    return;
  }

 
  @UseGuards(VKAuthGuard)
  @Get("/oauth/vk/redirect")
  @Redirect("about:blank;")
  async vkAuth(@Request() req) {
    return {
      url: `${req.session.redirect}?code=${
        (await this.authService.login(req.user)).access_token
      }`,
    };
  }

  @UseGuards(YandexAuthGuard)
  @Get("/oauth/ya/redirect")
  @Redirect("about:blank;")
  async yaAuth(@Request() req) {
    return {
      url: `${req.session.redirect}?code=${
        (await this.authService.login(req.user)).access_token
      }`,
    };
  }


  @Post("register")
  async register(@Body() data: any) {
    const user = await this.usersService.createUser(
      data.username,
      data.password,
    );
    return {
      access_token: (await this.authService.login(user)).access_token,
      username: user.username,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  getProfile(@Request() req) {
    return req.user;
  }





  @UseGuards(VKAuthGuard)
  @Get("/oauth/vk_")
  async vk() {}

  @UseGuards(YandexAuthGuard)
  @Get("/oauth/ya_")
  async ya() {}
}
