import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { HttpExceptionFilter } from './global-filter/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import * as hbs from 'express-handlebars';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine('hbs', hbs({ extname: 'hbs' }));
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe());
  const configService=app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter(configService));
  app.use(cors());
  await app.listen(3000);
}
bootstrap();
