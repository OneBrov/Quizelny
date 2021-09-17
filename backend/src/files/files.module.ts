import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { Files, FilesSchema } from './schema/files.schema';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    MongooseModule.forFeature([{ name: Files.name, schema: FilesSchema }]),
  ],
  exports: [FilesService],
})
export class FilesModule {}
