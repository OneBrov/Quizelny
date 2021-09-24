import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { Tokens, TokensDocument } from '../tokens/schema/tokens.schema';
import { Users, UsersDocument } from './schema/users.schema';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { TokensService } from '../tokens/tokens.service';
import { MailsService } from '../mails/mails.service';
import { isString, IsString } from 'class-validator';
import { Multer } from 'multer';
import { FilesService } from 'src/files/files.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private readonly tokensService: TokensService,
    private readonly mailsService: MailsService,
    private readonly filesService: FilesService,
  ) {}

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersModel.findOne({ email: dto.email });
    if (candidate) {
      throw new ConflictException('User already exists');
    }
    const hashPassword = await bcrypt.hash(dto.password, 3);
    const activationLink = uuid.v4();
    const user = await this.usersModel.create({
      email: dto.email,
      password: hashPassword,
      activationLink: activationLink,
      name: 'Unknown',
    });
    await this.mailsService.sendActivationMail(
      dto.email,
      `${process.env.API_URL}/users/activate/${activationLink}/`,
    );

    const userDto = new UserDto(user);
    const tokens = this.tokensService.generateTokens({ ...userDto });
    await this.tokensService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(dto: CreateUserDto) {
    const user = await this.usersModel.findOne({ email: dto.email });
    if (!user) {
      throw new BadRequestException(
        'Пользователь с данным email не был найден!',
      );
    }

    const isValidPassword = await bcrypt.compare(
      dto.password,
      String(user.password),
    );
    if (!isValidPassword) {
      throw new BadRequestException('Неверный пароль');
    }
    const userDto = new UserDto(user);
    const tokens = this.tokensService.generateTokens({ ...userDto });
    await this.tokensService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    const token = await this.tokensService.removeToken(refreshToken);
    return token;
  }

  async activate(activationLink: string) {
    const user = await this.usersModel.findOne({
      activationLink: activationLink,
    });
    if (!user) {
      throw new BadRequestException('Неккоректная ссылка акциваии аккаунта');
    }
    user.isActivated = true;
    user.save();
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
    const userData = this.tokensService.validateRefreshToken(refreshToken);
    const userToken = await this.tokensService.findToken(refreshToken);
    if (!userToken) {
      throw new UnauthorizedException();
    }
    const user = await this.usersModel.findById(userToken.user);
    const userDto = new UserDto(user);
    const tokens = this.tokensService.generateTokens({ ...userDto });
    await this.tokensService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAll() {
    return await this.usersModel.find();
  }

  async setName(name: string, refreshToken: string) {
    const user = await this.usersModel.findOne({ refreshToken: refreshToken });
    user.name = name;
    user.save();
    return user.name;
  }

  async setImage(file: Express.Multer.File, refreshToken: string) {
    const user = await this.usersModel.findOne({ refreshToken: refreshToken });
    if (user.image?.length) {
      const imageId = await this.filesService.getId(user.image);
      this.filesService.deleteOne(imageId);
    }
    const newImage = await this.filesService.create(file);
    user.image = newImage;
    user.save();
    return user.image;
  }
}
