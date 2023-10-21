import { Module } from "@nestjs/common";
import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Note, NoteSchema } from "./schemas/note.schema";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { NoteView, NoteViewSchema } from "./schemas/note-view.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    MongooseModule.forFeature([{
      name: NoteView.name,
      schema: NoteViewSchema,
    }]),
    UsersModule,
  ],
  controllers: [NotesController],
  providers: [NotesService, UsersService],
})
export class NotesModule {}
