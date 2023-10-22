
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  displayName: string;

  @Prop({default: "email"})
  provider: string;

  @Prop()
  password: string;

  @Prop({type: [String], default: [Role.User]})
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
