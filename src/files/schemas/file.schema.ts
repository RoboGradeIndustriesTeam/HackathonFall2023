
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FileDocument = HydratedDocument<File>;

@Schema()
export class File {
    @Prop({unique: true})
    hash: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
FileSchema.plugin(require("mongoose-autopopulate"))