import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RoundsDocument = Rounds & Document;

@Schema()
export class Rounds {
  @Prop(String)
  title: string;

  @Prop({
    type: [
      {
        title: String,
        questions: [mongoose.Schema.Types.ObjectId],
      },
    ],
    ref: 'Questions',
  })
  rows: [{ title: string; questions: mongoose.ObjectId[] }];
}

export const RoundsSchema = SchemaFactory.createForClass(Rounds);
