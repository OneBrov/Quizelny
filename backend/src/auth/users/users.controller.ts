import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Redirect,
  Req,
  Res,
  SetMetadata,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { NameDto } from './dto/name.dto';
import { UsersService } from './users.service';

const AllowUnauthorizedRequest = () =>
  SetMetadata('allowUnauthorizedRequest', true);

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/registration')
  @AllowUnauthorizedRequest()
  async registration(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: CreateUserDto,
  ) {
    const userData = await this.usersService.registration(dto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 360 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @Post('/login')
  @AllowUnauthorizedRequest()
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: CreateUserDto,
  ) {
    const userData = await this.usersService.login(dto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 360 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @Post('/logout')
  @AllowUnauthorizedRequest()
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies;
    const token = this.usersService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return token;
  }

  @Get('/refresh')
  @AllowUnauthorizedRequest()
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies;
    const userData = await this.usersService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 360 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/activate/:link*')
  @Redirect(String(process.env.CLIENT_URL), 301)
  @AllowUnauthorizedRequest()
  async activate(
    @Param('link', new ParseUUIDPipe({ version: '4' }))
    link: any,
  ) {
    await this.usersService.activate(link);
    return { url: process.env.CLIENT_URL };
  }

  @Post('/setName')
  async setName(@Body() name: NameDto, @Req() req: Request) {
    const { refreshToken } = req.cookies;
    return await this.usersService.setName(name.name, refreshToken);
  }

  @Post('/setImage')
  @UseInterceptors(FileInterceptor('image'))
  async setImage(
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
  ) {
    const { refreshToken } = req.cookies;
    return this.usersService.setImage(image, refreshToken);
  }
}
