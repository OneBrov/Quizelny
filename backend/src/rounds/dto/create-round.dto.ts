import { ObjectId } from 'mongoose';

export class CreateRoundDto {
  readonly title: string;
  readonly rows: { title: string; questions: ObjectId[] }[];
}
