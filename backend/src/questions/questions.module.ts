import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Questions, QuestionsSchema } from './schema/questions.schema';

@Module({
  providers: [QuestionsService],
  controllers: [QuestionsController],
  imports: [
    MongooseModule.forFeature([
      { name: Questions.name, schema: QuestionsSchema },
    ]),
    FilesModule,
  ],
})
export class QuestionsModule {}
