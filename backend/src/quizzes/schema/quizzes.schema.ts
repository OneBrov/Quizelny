import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type QuizzesDocument = Quizzes & Document;

@Schema()
export class Quizzes {
  @Prop(String)
  name: string;

  @Prop([String])
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Files' })
  imageId: mongoose.ObjectId; //id

  @Prop()
  image: string; //image path

  @Prop()
  date: Date;

  @Prop()
  playCount: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Rounds' })
  rounds: mongoose.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Rounds' })
  finalRound: mongoose.ObjectId;
}

export const QuizzesSchema = SchemaFactory.createForClass(Quizzes);
