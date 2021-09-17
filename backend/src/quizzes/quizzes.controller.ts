import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizzesService } from './quizzes.service';

@Controller('/quizzes')
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @Get()
  getAll() {
    return this.quizzesService.getAll();
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
}
