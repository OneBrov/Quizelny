import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type QuestionsDocument = Questions & Document;

@Schema()
export class Questions {
  @Prop()
  row: number;

  @Prop()
  price: number;

  @Prop(String)
  text: string;

  @Prop(String)
  type: 'text' | 'audio' | 'video' | 'image';

  @Prop(String)
  answer: string;

  @Prop(String)
  wrongAnswer: string;

  @Prop(String)
  file: string; //file path
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);
