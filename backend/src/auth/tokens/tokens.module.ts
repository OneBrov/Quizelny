import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tokens, TokensSchema } from './schema/tokens.schema';
import { TokensService } from './tokens.service';

@Global()
@Module({
  providers: [TokensService],
  imports: [
    MongooseModule.forFeature([{ name: Tokens.name, schema: TokensSchema }]),
  ],
  exports: [TokensService],
})
export class TokensModule {}
