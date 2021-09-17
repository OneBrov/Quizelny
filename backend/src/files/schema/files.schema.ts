import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FilesDocument = Files & Document;

@Schema()
export class Files {
  @Prop()
  name: string;

  @Prop()
  data: Buffer;

  @Prop()
  contentType: string;
}

export const FilesSchema = SchemaFactory.createForClass(Files);
