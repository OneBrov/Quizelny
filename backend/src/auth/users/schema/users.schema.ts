import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false })
  isActivated: boolean;

  @Prop()
  activationLink: string;

  @Prop()
  image: string;

  @Prop()
  name: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
