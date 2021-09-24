import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipe } from 'src/parseObjectId.pipe';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';

@Controller('/questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Get(':id')
  getOne(@Param('id', new ParseObjectIdPipe()) id: ObjectId) {
    return this.questionService.getOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() dto: CreateQuestionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.questionService.create(dto, file);
  }
}
