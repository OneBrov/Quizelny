import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsModule } from 'src/questions/questions.module';
import { RoundsController } from './rounds.controller';
import { RoundsService } from './rounds.service';
import { Rounds, RoundsSchema } from './schema/rounds.schema';

@Module({
  providers: [RoundsService],
  controllers: [RoundsController],
  imports: [
    MongooseModule.forFeature([{ name: Rounds.name, schema: RoundsSchema }]),
    QuestionsModule,
  ],
  exports: [RoundsService],
})
export class RoundsModule {}
