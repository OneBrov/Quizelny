import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';
import { MailsModule } from '../mails/mails.module';
import { TokensModule } from '../tokens/tokens.module';
import { Users, UsersSchema } from './schema/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    TokensModule,
    MailsModule,
    FilesModule,
  ],
})
export class UsersModule {}
