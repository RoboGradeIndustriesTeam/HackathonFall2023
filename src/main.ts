import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/exception-filter';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.use(
    session({
      secret: 'please-todo-change-to-load-from-environment-file-if-you-from-webpractick-and-read-it-sorry',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(3000);
}
bootstrap();
