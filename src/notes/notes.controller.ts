import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { CreateAnonymousNoteDto, CreateNoteDto } from "./dto/create-note.dto";
import { NotesService } from "./notes.service";
import { User } from "src/users/schemas/user.schema";
import { UsersService } from "src/users/users.service";
import { TelegraphImportService } from "./telegra-ph-import.service";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "src/auth/role.enum";

@Controller("notes")
export class NotesController {
  constructor(
    private noteService: NotesService,
    private usersService: UsersService,
    private telegraphImportService: TelegraphImportService
  ) {}
  @Post("anonymous")
  async createNotes(@Body() body: CreateAnonymousNoteDto) {
    return await this.noteService.createNote(
      body.name,
      body.body,
      body.subtitle,
      null,
      body.authorName,
      body.burnable,
      body.theme
    );
  }

  @Post("")
  @UseGuards(JwtAuthGuard)
  async createNotesFromUser(@Body() body: CreateNoteDto, @Request() req) {
    return await this.noteService.createNote(
      body.name,
      body.body,
      body.subtitle,
      req.user as User,
      req.user.username,
      -1,
      body.theme
    );
  }

  @Put(":slug")
  @UseGuards(JwtAuthGuard)
  async updateNote(
    @Param("slug") slug: string,
    @Request() req,
    @Body() newBody: { body: string },
  ) {
    const nt = await this.noteService.getNote(slug);
    if (nt === null) {
      throw new BadRequestException("Статья не найдена");
    }
    if (nt.author.username === req.user.username) {
      return await this.noteService.updateNote(slug, newBody.body);
    }
    throw new UnauthorizedException();
  }

  @Get(":slug")
  async getNote(@Param("slug") slug: string, @Request() req) {
    const finger: string | null = req.header("X-Browser-Fingerprint") || null
    const nt = await this.noteService.getNote(slug);
    if (nt === null) {
      throw new BadRequestException("Статья не найдена");
    }
    if (finger !== null) await this.noteService.upViews(slug, finger);

    return nt;
  }

  @Get("/user/:username")
  async getUserNotes(@Param("username") username: string) {
    return await this.noteService.getUserNotes(await this.usersService.findUserByName(username));
  }

  @Post("/import/telegraph/:telegraphSlug")
  async importFromTelegrap(@Param("telegraphSlug") tgphSlug) {
    return await this.telegraphImportService.importFromTelegraph(tgphSlug)
  }

    //    /* ADMIN REGION */
    //    @Get('all')
    //    @Roles(Role.Admin)
    //    async getAllNotes() {
    //        return await this.noteService.findAll()
    //    }

}
