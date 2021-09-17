import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateRoundDto } from './dto/create-round.dto';
import { Rounds, RoundsDocument } from './schema/rounds.schema';

@Injectable()
export class RoundsService {
  constructor(
    @InjectModel(Rounds.name) private roundsModel: Model<RoundsDocument>,
  ) {}

  async getOne(id: ObjectId) {
    return await this.roundsModel.findById(id);
  }

  async create(dto: CreateRoundDto) {
    const round = await this.roundsModel.create({
      ...dto,
    });
    const populated = await round.populate({
      path: 'rows.questions',
      model: 'Questions',
    });

    console.log(populated.rows);

    return await round.populate({
      path: 'rows.questions',
      model: 'Questions',
    });
  }
}
