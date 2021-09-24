import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { QuestionsService } from 'src/questions/questions.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { Rounds, RoundsDocument } from './schema/rounds.schema';

@Injectable()
export class RoundsService {
  constructor(
    @InjectModel(Rounds.name) private roundsModel: Model<RoundsDocument>,
    private readonly questionService: QuestionsService,
  ) {}

  async getOne(id: ObjectId) {
    return await this.roundsModel.findById(id);
  }

  async create(dto: CreateRoundDto) {
    const round = await this.roundsModel.create({
      ...dto,
    });
    return await round.populate({
      path: 'rows.questions',
      model: 'Questions',
    });
  }

  async deleteOne(id: ObjectId) {
    const round = await this.roundsModel.findById(id);
    round.rows.map((row) => {
      row.questions.map((question) => this.questionService.deleteOne(question));
    });
    return await round.deleteOne();
  }
}
