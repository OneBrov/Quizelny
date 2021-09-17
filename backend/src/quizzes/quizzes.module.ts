import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';
import { Files, FilesSchema } from 'src/files/schema/files.schema';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Quizzes, QuizzesSchema } from './schema/quizzes.schema';

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService],
  imports: [
    MongooseModule.forFeature([{ name: Quizzes.name, schema: QuizzesSchema }]),
    FilesModule,
  ],
})
export class QuizzesModule {}
