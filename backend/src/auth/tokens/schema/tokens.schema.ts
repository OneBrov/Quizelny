import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';

export type TokensDocument = Tokens & Document;

@Schema()
export class Tokens {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  user: ObjectId;

  @Prop({ required: true })
  refreshToken: string;
}

export const TokensSchema = SchemaFactory.createForClass(Tokens);
