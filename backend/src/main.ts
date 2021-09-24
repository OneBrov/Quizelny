import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AuthGuard } from './auth.guard';
import { TokensService } from './auth/tokens/tokens.service';
import { ParseObjectIdPipe } from './parseObjectId.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ credentials: true, origin: process.env.CLIENT_URL });
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
