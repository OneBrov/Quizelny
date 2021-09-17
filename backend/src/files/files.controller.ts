import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  ResponseDecoratorOptions,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
import { FilesService } from './files.service';

@Controller('/files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get(':id')
  getOne(@Param('id') id: ObjectId, @Res() res: Response) {
    return this.filesService.getOne(id, res);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.create(file);
  }
}
