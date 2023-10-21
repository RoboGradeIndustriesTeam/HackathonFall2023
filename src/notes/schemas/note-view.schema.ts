
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { Note } from './note.schema';
export type NoteViewDocument = HydratedDocument<NoteView>;

@Schema()
export class NoteView {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Note', autopopulate: true})
    note: Note;

    @Prop()
    finger: string;
}

export const NoteViewSchema = SchemaFactory.createForClass(NoteView);
NoteViewSchema.plugin(require("mongoose-autopopulate"))