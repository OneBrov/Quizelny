import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ObjectId, Types } from 'mongoose';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizzesService } from './quizzes.service';
import { ParseObjectIdPipe } from 'src/parseObjectId.pipe';
import { AuthGuard } from 'src/auth.guard';

@Controller('/quizzes')

export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @Get()
  getAll() {
    return this.quizzesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseObjectIdPipe()) id: ObjectId) {
    return this.quizzesService.getOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreateQuizDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.quizzesService.create(dto, image);
  }

  @Delete()
  deleteAll() {
    return this.quizzesService.deleteAll();
  }

  @Delete(':id')
  deleteOne(@Param() id: ObjectId) {
    this.quizzesService.deleteOne(id);
  }
}
