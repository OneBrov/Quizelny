import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';
import { RoundsModule } from 'src/rounds/rounds.module';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Quizzes, QuizzesSchema } from './schema/quizzes.schema';

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService],
  imports: [
    MongooseModule.forFeature([{ name: Quizzes.name, schema: QuizzesSchema }]),
    FilesModule,
    RoundsModule,
  ],
})
export class QuizzesModule {}
