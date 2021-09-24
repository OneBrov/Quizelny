import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from './auth.guard';
import { AuthModule } from './auth/auth.module';
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
    AuthModule,
    MongooseModule.forRoot(process.env.MONGOOSE_LINK),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
