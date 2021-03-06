import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { RoundsService } from 'src/rounds/rounds.service';

import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quizzes, QuizzesDocument } from './schema/quizzes.schema';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quizzes.name) private quizzesModel: Model<QuizzesDocument>,
    private readonly filesService: FilesService,
    private readonly roundsService: RoundsService,
  ) {}

  async create(dto: CreateQuizDto, image?: Express.Multer.File) {
    const imageId = image ? await this.filesService.create(image) : null;
    const quiz = await this.quizzesModel.create({
      ...dto,
      date: new Date(),
      content: { rounds: '', final: '' },
      playCount: 0,
      ...(imageId && {
        image: process.env.FILES_PATH + imageId,
        imageId: imageId,
      }),
    });
    return quiz;
  }

  async getAll(): Promise<Quizzes[]> {
    return await this.quizzesModel.find();
  }

  async getOne(id: ObjectId) {
    return await this.quizzesModel.findById(id);
  }

  async deleteOne(id: ObjectId) {
    const quiz = await this.quizzesModel.findById(id);
    // this.filesService.deleteOne(quiz.imageId);
    // this.roundsService.deleteOne(quiz.finalRound);
    // quiz.rounds.map((round) => this.roundsService.deleteOne(round));
    const deletedQuiz = await quiz.deleteOne();
    return deletedQuiz;
  }

  async deleteAll(): Promise<any> {
    // deleting all files before delete quiz
    this.quizzesModel.find({}, (err, quizzes) => {
      if (err) return;
      quizzes.map((quiz) => {
        this.filesService.deleteOne(quiz.imageId);
      });
    });
    return await this.quizzesModel.deleteMany();
  }
}
