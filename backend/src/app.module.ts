import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from './files/files.module';
import { QuestionsModule } from './questions/questions.module';

import { QuizzesModule } from './quizzes/quizzes.module';
import { RoundsModule } from './rounds/rounds.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    QuizzesModule,
    FilesModule,
    QuestionsModule,
    RoundsModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin2:admin@cluster0.jbu5l.mongodb.net/quiz-app?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
