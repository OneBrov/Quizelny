import { Module } from '@nestjs/common';
import { MailsModule } from './mails/mails.module';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, TokensModule, MailsModule],
})
export class AuthModule {}
