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

@Controller("notes")
export class NotesController {
  constructor(
    private noteService: NotesService,
    private usersService: UsersService,
  ) {}
  @Post("anonymous")
  async createNotes(@Body() body: CreateAnonymousNoteDto) {
    return await this.noteService.createNote(
      body.name,
      body.body,
      body.subtitle,
      null,
      body.authorName,
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
    return await this.noteService.getUserNotes((await this.usersService.findUserByName(username))._id.toString());
  }
}
