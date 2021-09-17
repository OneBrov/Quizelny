import {
  HttpException,
  HttpStatus,
  Injectable,
  ResponseDecoratorOptions,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model, ObjectId } from 'mongoose';
import { Files, FilesDocument } from './schema/files.schema';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(Files.name) private filesModel: Model<FilesDocument>,
  ) {}

  async getOne(id: ObjectId, res: Response) {
    const file = await this.filesModel.findById(id);
    res.writeHead(200, { 'Content-Type': file.contentType });
    res.end(file.data);
  }

  async deleteOne(id: ObjectId) {
    const deleted = await this.filesModel.deleteOne({ _id: id });
    return deleted;
  }

  async create(file: Express.Multer.File) {
    const fileInst = await this.filesModel.create({
      name: file.filename,
      data: file.buffer,
      contentType: file.mimetype,
    });

    return fileInst._id;
  }
}
