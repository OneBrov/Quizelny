import { ObjectId } from 'mongoose';
import { CreateRoundDto } from 'src/rounds/dto/create-round.dto';

export class CreateQuizDto {
  readonly name: string;
  readonly tags: string[];
  readonly image?: File;
  readonly rounds: ObjectId[];
  readonly finalRounds: ObjectId;
}
