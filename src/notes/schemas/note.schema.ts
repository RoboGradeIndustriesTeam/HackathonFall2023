
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import mongooseAutoPopulate from 'mongoose-autopopulate';
export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  body: string;

  @Prop({unique: true})
  slug: string;

  @Prop({default: "Аноним"})
  authorName: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, autopopulate: true})
  author: User | null;

  @Prop({default: Date.now})
  createdAt: number

  @Prop({default: 0})
  views: number;

  @Prop({default: false})
  burnable: boolean;

  @Prop({default: "default"})
  theme: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
NoteSchema.plugin(require("mongoose-autopopulate"))