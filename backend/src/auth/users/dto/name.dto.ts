import { IsString, Length } from 'class-validator';

export class NameDto {
  @IsString()
  @Length(3, 20)
  name: string;
}
