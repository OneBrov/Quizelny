import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipe } from 'src/parseObjectId.pipe';
import { CreateRoundDto } from './dto/create-round.dto';
import { RoundsService } from './rounds.service';

@Controller('/rounds')
export class RoundsController {
  constructor(private roundsService: RoundsService) {}

  @Get(':id')
  getOne(@Param('id', new ParseObjectIdPipe()) id: ObjectId) {
    return this.roundsService.getOne(id);
  }

  @Post()
  create(@Body() dto: CreateRoundDto) {
    return this.roundsService.create(dto);
  }
}
