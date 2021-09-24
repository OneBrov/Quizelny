import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  ResponseDecoratorOptions,
  SetMetadata,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipe } from 'src/parseObjectId.pipe';
import { FilesService } from './files.service';

const AllowUnauthorizedRequest = () =>
  SetMetadata('allowUnauthorizedRequest', true);

@Controller('/files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get(':id')
  @AllowUnauthorizedRequest()
  getOne(
    @Param('id', new ParseObjectIdPipe()) id: ObjectId,
    @Res() res: Response,
  ) {
    return this.filesService.getOne(id, res);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.create(file);
  }
}
