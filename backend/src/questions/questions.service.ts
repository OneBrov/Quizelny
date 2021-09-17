import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Questions, QuestionsDocument } from './schema/questions.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Questions.name)
    private questionsModel: Model<QuestionsDocument>,
    private readonly filesService: FilesService,
  ) {}

  async getOne(id: ObjectId) {
    return await this.questionsModel.findById(id);
  }

  async deleteOne(id: ObjectId) {
    const question = await this.questionsModel.findById(id);
    const fileId = question.file.split('/').reverse()[0];
    if (question.file) {
      this.filesService.deleteOne(fileId as unknown as ObjectId);
    }
    return await question.deleteOne();
  }

  async create(dto: CreateQuestionDto, file?: Express.Multer.File) {
    let fileId = null;
    if (file) {
      fileId = await this.filesService.create(file);
    }
    console.log(dto);
    return await this.questionsModel.create({
      ...dto,
      ...(fileId && { file: process.env.FILES_PATH + fileId }),
    });
  }
}
