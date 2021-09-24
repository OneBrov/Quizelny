import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @Length(3, 32)
  @IsString()
  password: string;
}

export class UserDto {
  @IsEmail()
  @IsString()
  email: string;

  id: ObjectId;

  @IsBoolean()
  isActivated: boolean;

  @IsString()
  name: string;

  @IsString()
  image?: string;

  constructor(user) {
    this.email = user.email;
    this.id = user._id;
    this.isActivated = user.isActivated;
    user.name && (this.name = user.name);
    user.image && (this.image = user.image);
  }
}
